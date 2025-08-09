import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { SkillLevel, TestStatus, TestStep } from "@prisma/client";
import { systemconfigService } from "../SystemConfig/SystemConfig.service";
import { CertificateService } from "../Certificate/Certificate.service";

// Determine level achieved and blocking status
const determineLevelAndBlocking = (step: TestStep, score: number) => {
  let levelAchieved: SkillLevel | null = null;
  let shouldBlock = false;

  if (score < 25) {
    if (step === TestStep.STEP_1) {
      shouldBlock = true;
    }
    return { levelAchieved, shouldBlock };
  }

  switch (step) {
    case TestStep.STEP_1:
      if (score >= 25 && score < 50) {
        levelAchieved = SkillLevel.A1;
      } else if (score >= 50) {
        levelAchieved = SkillLevel.A2;
      }
      break;
    case TestStep.STEP_2:
      if (score >= 25 && score < 50) {
        levelAchieved = SkillLevel.B1;
      } else if (score >= 50) {
        levelAchieved = SkillLevel.B2;
      }
      break;
    case TestStep.STEP_3:
      if (score >= 25 && score < 50) {
        levelAchieved = SkillLevel.C1;
      } else if (score >= 50) {
        levelAchieved = SkillLevel.C2;
      }
      break;
  }

  return { levelAchieved, shouldBlock };
};

// Start new test attempt
const startTestAttempt = async (userId: string, step: TestStep) => {
  // Get system config for time limits
  const config = await systemconfigService.getSystemConfig();
  let timeLimit: number;

  switch (step) {
    case TestStep.STEP_1:
      timeLimit = config.step1TimeLimit;
      break;
    case TestStep.STEP_2:
      timeLimit = config.step2TimeLimit;
      break;
    case TestStep.STEP_3:
      timeLimit = config.step3TimeLimit;
      break;
  }

  return await prisma.testAttempt.create({
    data: {
      userId,
      step,
      timeLimit,
      status: TestStatus.IN_PROGRESS,
    },
  });
};

// Get test attempt by ID
const getTestAttemptById = async (testAttemptId: string) => {
  return await prisma.testAttempt.findUnique({
    where: { id: testAttemptId },
    include: {
      answers: {
        include: {
          question: {
            select: {
              id: true,
              questionText: true,
              options: true,
              timeLimit: true,
              competency: {
                select: { name: true },
              },
            },
          },
        },
      },
    },
  });
};

// Get active test attempt for user
const getActiveTestAttempt = async (userId: string) => {
  return await prisma.testAttempt.findFirst({
    where: {
      userId,
      status: TestStatus.IN_PROGRESS,
    },
    include: {
      answers: {
        include: {
          question: {
            select: {
              id: true,
              questionText: true,
              options: true,
              timeLimit: true,
            },
          },
        },
      },
    },
  });
};

// Update test attempt
const updateTestAttempt = async (
  testAttemptId: string,
  data: Partial<{
    completedAt: Date;
    score: number;
    status: TestStatus;
    levelAchieved: SkillLevel;
  }>
) => {
  return await prisma.testAttempt.update({
    where: { id: testAttemptId },
    data,
  });
};

// Complete test and calculate score
const completeTestAttempt = async (testAttemptId: string) => {
  const testAttempt = await prisma.testAttempt.findUnique({
    where: { id: testAttemptId },
    include: {
      answers: {
        include: {
          question: true,
        },
      },
      user: true,
    },
  });

  if (!testAttempt) {
    throw new Error("Test attempt not found");
  }

  // Calculate score
  const totalQuestions = testAttempt.answers.length;
  const correctAnswers = testAttempt.answers.filter((a) => a.isCorrect).length;
  const score =
    totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

  // Determine level achieved and certification
  const { levelAchieved, shouldBlock } = determineLevelAndBlocking(
    testAttempt.step,
    score
  );

  // Update test attempt
  const updatedAttempt = await prisma.testAttempt.update({
    where: { id: testAttemptId },
    data: {
      completedAt: new Date(),
      score,
      status:
        score < 25 && testAttempt.step === TestStep.STEP_1
          ? TestStatus.FAILED
          : TestStatus.COMPLETED,
      levelAchieved,
    },
  });

  // Block user if they failed Step 1
  if (shouldBlock) {
    await prisma.user.update({
      where: { id: testAttempt.userId },
      data: { status: "BLOCKED" },
    });
  }

  // Generate certificate if applicable
  if (levelAchieved) {
    await CertificateService.generateCertificate({
      userId: testAttempt.userId,
      testAttemptId,
      level: levelAchieved,
      score,
    });
  }

  return updatedAttempt;
};

// Auto-submit test when time expires
const autoSubmitExpiredTest = async (testAttemptId: string) => {
  await prisma.testAttempt.update({
    where: { id: testAttemptId },
    data: {
      status: TestStatus.EXPIRED,
      completedAt: new Date(),
    },
  });

  return await completeTestAttempt(testAttemptId);
};

// Get test results with detailed answers
const getTestResults = async (testAttemptId: string) => {
  return await prisma.testAttempt.findUnique({
    where: { id: testAttemptId },
    include: {
      answers: {
        include: {
          question: {
            select: {
              questionText: true,
              correctAnswer: true,
              explanation: true,
              competency: {
                select: { name: true },
              },
            },
          },
        },
      },
      certificates: true,
    },
  });
};

// Get test attempts by user
const getTestAttemptsByUser = async (userId: string) => {
  return await prisma.testAttempt.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    include: {
      certificates: true,
    },
  });
};

// Get test attempts by step
const getTestAttemptsByStep = async (step: TestStep) => {
  return await prisma.testAttempt.findMany({
    where: { step },
    orderBy: { startedAt: "desc" },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
};

// Delete test attempt
const deleteTestAttempt = async (testAttemptId: string) => {
  // Delete related answers first
  await prisma.answer.deleteMany({
    where: { testAttemptId },
  });

  return await prisma.testAttempt.delete({
    where: { id: testAttemptId },
  });
};

export const testattemptService = {
  getActiveTestAttempt,
  updateTestAttempt,
  deleteTestAttempt,
  determineLevelAndBlocking,
  startTestAttempt,
  getTestAttemptById,
  completeTestAttempt,
  autoSubmitExpiredTest,
  getTestResults,
  getTestAttemptsByUser,
  getTestAttemptsByStep,
};
