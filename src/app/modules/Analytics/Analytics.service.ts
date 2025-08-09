// Analytics.service: Module file for the Analytics.service functionality.

import { TestStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";

// Get overall system statistics
const getSystemStats = async () => {
  const [totalUsers, totalTests, totalCertificates, blockedUsers, avgScores] =
    await Promise.all([
      prisma.user.count(),
      prisma.testAttempt.count({ where: { status: TestStatus.COMPLETED } }),
      prisma.certificate.count({ where: { isActive: true } }),
      prisma.user.count({ where: { status: "BLOCKED" } }),
      prisma.testAttempt.aggregate({
        where: { status: TestStatus.COMPLETED },
        _avg: { score: true },
      }),
    ]);

  return {
    totalUsers,
    totalTests,
    totalCertificates,
    blockedUsers,
    averageScore: avgScores._avg.score || 0,
  };
};

// Get certification level distribution
const getCertificationDistribution = async () => {
  const distribution = await prisma.certificate.groupBy({
    by: ["level"],
    where: { isActive: true },
    _count: { level: true },
  });

  return distribution.map((item) => ({
    level: item.level,
    count: item._count.level,
  }));
};

// Get competency performance analytics
const getCompetencyPerformance = async () => {
  const performance = await prisma.answer.groupBy({
    by: ["questionId"],
    _avg: { isCorrect: true },
    _count: { questionId: true },
    having: {
      questionId: {
        _count: {
          gte: 10, // Only include questions answered at least 10 times
        },
      },
    },
  });

  // Get question details
  const questionIds = performance.map((p) => p.questionId);
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    include: {
      competency: {
        select: { name: true },
      },
    },
  });

  return performance.map((perf) => {
    const question = questions.find((q) => q.id === perf.questionId);
    return {
      questionId: perf.questionId,
      competencyName: question?.competency.name,
      level: question?.level,
      correctPercentage: (perf._avg.isCorrect || 0) * 100,
      totalAttempts: perf._count.questionId,
    };
  });
};

// Get test attempt statistics by step
const getTestStepStats = async () => {
  const stats = await prisma.testAttempt.groupBy({
    by: ["step", "status"],
    _count: { step: true },
    _avg: { score: true },
  });

  return stats.map((stat) => ({
    step: stat.step,
    status: stat.status,
    count: stat._count.step,
    averageScore: stat._avg.score || 0,
  }));
};

// Get daily test statistics
const getDailyTestStats = async (days: number = 30) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return await prisma.testAttempt.groupBy({
    by: ["startedAt"],
    where: {
      startedAt: {
        gte: startDate,
      },
    },
    _count: { startedAt: true },
  });
};

export const AnalyticsService = {
  getSystemStats,
  getCertificationDistribution,
  getCompetencyPerformance,
  getTestStepStats,
  getDailyTestStats,
};
