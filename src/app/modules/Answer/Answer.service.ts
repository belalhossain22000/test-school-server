// Answer.service: Module file for the Answer.service functionality.

import prisma from "../../../shared/prisma";

// Submit answer to a question
 const submitAnswer = async (data: {
  testAttemptId: string;
  questionId: string;
  userAnswer: string;
  timeSpent: number;
}) => {
  // Get the correct answer
  const question = await prisma.question.findUnique({
    where: { id: data.questionId },
    select: { correctAnswer: true }
  });

  if (!question) {
    throw new Error('Question not found');
  }

  const isCorrect = data.userAnswer === question.correctAnswer;

  return await prisma.answer.upsert({
    where: {
      testAttemptId_questionId: {
        testAttemptId: data.testAttemptId,
        questionId: data.questionId
      }
    },
    update: {
      userAnswer: data.userAnswer,
      isCorrect,
      timeSpent: data.timeSpent
    },
    create: {
      testAttemptId: data.testAttemptId,
      questionId: data.questionId,
      userAnswer: data.userAnswer,
      isCorrect,
      timeSpent: data.timeSpent
    }
  });
};

// Get answer by test attempt and question
 const getAnswer = async (testAttemptId: string, questionId: string) => {
  return await prisma.answer.findUnique({
    where: {
      testAttemptId_questionId: {
        testAttemptId,
        questionId
      }
    },
    include: {
      question: {
        select: {
          questionText: true,
          options: true,
          correctAnswer: true
        }
      }
    }
  });
};

// Get all answers for a test attempt
 const getAnswersByTestAttempt = async (testAttemptId: string) => {
  return await prisma.answer.findMany({
    where: { testAttemptId },
    include: {
      question: {
        select: {
          questionText: true,
          options: true,
          correctAnswer: true,
          explanation: true,
          competency: {
            select: { name: true }
          }
        }
      }
    },
    orderBy: { answeredAt: 'asc' }
  });
};

// Update answer
 const updateAnswer = async (
  testAttemptId: string,
  questionId: string,
  data: Partial<{
    userAnswer: string;
    timeSpent: number;
  }>
) => {
  const question = await prisma.question.findUnique({
    where: { id: questionId },
    select: { correctAnswer: true }
  });

  if (!question) {
    throw new Error('Question not found');
  }

  const isCorrect = data.userAnswer === question.correctAnswer;

  return await prisma.answer.update({
    where: {
      testAttemptId_questionId: {
        testAttemptId,
        questionId
      }
    },
    data: {
      ...data,
      isCorrect
    }
  });
};

// Delete answer
 const deleteAnswer = async (testAttemptId: string, questionId: string) => {
  return await prisma.answer.delete({
    where: {
      testAttemptId_questionId: {
        testAttemptId,
        questionId
      }
    }
  });
};


export const AnswerService = {
  submitAnswer,
  getAnswer,
  getAnswersByTestAttempt,
  updateAnswer,
  deleteAnswer
};