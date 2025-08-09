import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import { SkillLevel, TestStep } from "@prisma/client";
import { shuffleArray } from "../../../helpars/shuffleArray";

const createQuestion = async (data: {
    competencyId: string;
    level: SkillLevel;
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    timeLimit?: number;
  }) => {
    return await prisma.question.create({
      data: {
        ...data,
        options: data.options,
        timeLimit: data.timeLimit || 60
      }
    });
  };


  const getQuestionsForStep = async (step: TestStep) => {
    let levels: SkillLevel[] = [];
    console.log(step);
  
    switch (step) {
      case TestStep.STEP_1:
        levels = [SkillLevel.A1, SkillLevel.A2];
        break;
      case TestStep.STEP_2:
        levels = [SkillLevel.B1, SkillLevel.B2];
        break;
      case TestStep.STEP_3:
        levels = [SkillLevel.C1, SkillLevel.C2];
        break;
    }
  
    const questions = await prisma.question.findMany({
      where: {
        level: { in: levels },
        isActive: true
      },
      include: {
        competency: {
          select: { name: true }
        }
      }
    });
  
    // Shuffle questions for randomization
    return shuffleArray(questions);
  };

  const getQuestionForTest = async (questionId: string) => {
    return await prisma.question.findUnique({
      where: { id: questionId },
      select: {
        id: true,
        questionText: true,
        options: true,
        timeLimit: true,
        competency: {
          select: { name: true }
        }
      }
    });
  };
  
  const getQuestionById = async (questionId: string) => {
    return await prisma.question.findUnique({
      where: { id: questionId },
      include: {
        competency: {
          select: { name: true }
        }
      }
    });
  };


  const updateQuestion = async (
    id: string,
    data: Partial<{
      questionText: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
      timeLimit: number;
      isActive: boolean;
    }>
  ) => {
    return await prisma.question.update({
      where: { id },
      data
    });
  };


  const deleteQuestion = async (id: string) => {
    const existingQuestion = await prisma.question.findUnique({ where: { id } });
       if (!existingQuestion) {
           throw new ApiError(httpStatus.NOT_FOUND, "Question not found..!!");
       }
       const result = await prisma.question.delete({ where: { id } });
       return null;
   };


  // Get questions by competency and level
 const getQuestionsByCompetencyAndLevel = async (
    competencyId: string,
    level: SkillLevel
  ) => {
    console.log(competencyId, level);
    return await prisma.question.findMany({
      where: {
        competencyId,
        level,
        isActive: true
      },
      include: {
        competency: {
          select: { name: true }
        }
      }
    });
  };


  const bulkCreateQuestions = async (questions: Array<{
    competencyId: string;
    level: SkillLevel;
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
    timeLimit?: number;
  }>) => {
    return await prisma.question.createMany({
      data: questions.map(q => ({
        ...q,
        options: q.options,
        timeLimit: q.timeLimit || 60
      }))
    });
  };
  

// //   Get question statistics
// //   Get question statistics
//  const getQuestionStats = async (questionId: string) => {
//     const stats = await prisma.answer.aggregate({
//       where: { questionId },
//       _count: { questionId: true },
//       _sum: { 
//         isCorrect: true,
//         timeSpent: true 
//       }
//     });
    
//     return {
//       totalAttempts: stats?._count?.questionId,
//       correctPercentage: (stats._sum?.isCorrect || 0) / (stats._count?.questionId || 1) * 100,
//       avgTimeSpent: (stats._sum?.timeSpent || 0) / (stats._count?.questionId || 1)
//     };
//   };

const getAllQuestions = async (query: Record<string, any>) => {
    const result = await prisma.question.findMany();
    return result;
};




export const questionService = {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
    getQuestionsByCompetencyAndLevel,
    bulkCreateQuestions,
    getQuestionForTest,
    getQuestionById,
    getQuestionsForStep

};
