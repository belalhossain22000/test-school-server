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
    // First get questions with enough attempts
    const questionsWithCounts = await prisma.answer.groupBy({
      by: ['questionId'],
      _count: { questionId: true },
      having: {
        questionId: {
          _count: {
            gte: 10 // Only include questions answered at least 10 times
          }
        }
      }
    });
  
    const questionIds = questionsWithCounts.map(q => q.questionId);
  
    if (questionIds.length === 0) {
      return [];
    }
  
    // Get detailed performance for each question
    const performance = await Promise.all(
      questionIds.map(async (questionId) => {
        const [totalAnswers, correctAnswers] = await Promise.all([
          prisma.answer.count({
            where: { questionId }
          }),
          prisma.answer.count({
            where: { 
              questionId,
              isCorrect: true 
            }
          })
        ]);
  
        return {
          questionId,
          totalAttempts: totalAnswers,
          correctAnswers,
          correctPercentage: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0
        };
      })
    );
  
    // Get question details
    const questions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: {
        competency: {
          select: { name: true }
        }
      }
    });
  
    return performance.map(perf => {
      const question = questions.find(q => q.id === perf.questionId);
      return {
        questionId: perf.questionId,
        competencyName: question?.competency.name,
        level: question?.level,
        correctPercentage: perf.correctPercentage,
        totalAttempts: perf.totalAttempts,
        correctAnswers: perf.correctAnswers
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
