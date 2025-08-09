import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { questionService } from "./Question.service";

const createQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.createQuestion(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Question created successfully",
    data: result,
  });
});

const getAllQuestions = catchAsync(async (req: Request, res: Response) => {
  const results = await questionService.getAllQuestions(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Questions retrieved successfully",
    data: results,
  });
});

//getQuestionsForStep
const getQuestionsForStep = catchAsync(async (req: Request, res: Response) => {
  const { step } = req.query;
  const result = await questionService.getQuestionsForStep(step as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question retrieved successfully",
    data: result,
  });
});

const getQuestionById = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.getQuestionById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question retrieved successfully",
    data: result,
  });
});

const updateQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.updateQuestion(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question updated successfully",
    data: result,
  });
});

const deleteQuestion = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.deleteQuestion(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question deleted successfully",
    data: result,
  });
});

//getQuestionsByCompetencyAndLevel
const getQuestionsByCompetencyAndLevel = catchAsync(
  async (req: Request, res: Response) => {
    const { competencyId, level } = req.query;

    const result = await questionService.getQuestionsByCompetencyAndLevel(
      competencyId as string,
      level as any
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Question deleted successfully",
      data: result,
    });
  }
);

//   bulkCreateQuestions
const bulkCreateQuestions = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.bulkCreateQuestions(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "bulk Question created successfully",
    data: result,
  });
});

//getQuestionForTest
const getQuestionForTest = catchAsync(async (req: Request, res: Response) => {
  const result = await questionService.getQuestionForTest(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Question retrieved successfully",
    data: result,
  });
});

export const questionController = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getQuestionsByCompetencyAndLevel,
  bulkCreateQuestions,
  getQuestionsForStep,
  getQuestionForTest,
};
