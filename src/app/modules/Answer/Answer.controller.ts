// Answer.controller: Module file for the Answer.controller functionality.
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AnswerService } from "./Answer.service";

//submitAnswer
const submitAnswer = catchAsync(async (req: Request, res: Response) => {
  const result = await AnswerService.submitAnswer(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Answer submitted successfully!",
    data: result,
  });
});

//get anser
const getAnswer = catchAsync(async (req: Request, res: Response) => {
  const { testAttemptId, questionId } = req.body;
  const result = await AnswerService.getAnswer(testAttemptId, questionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Answer retrieved successfully",
    data: result,
  });
});

//getAnswersByTestAttempt
const getAnswersByTestAttempt = catchAsync(
  async (req: Request, res: Response) => {
    const { testAttemptId } = req.body;
    const result = await AnswerService.getAnswersByTestAttempt(testAttemptId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Answers retrieved successfully",
      data: result,
    });
  }
);

//updateAnswer
const updateAnswer = catchAsync(async (req: Request, res: Response) => {
  const { testAttemptId, questionId } = req.body;
  const result = await AnswerService.updateAnswer(
    testAttemptId,
    questionId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Answer updated successfully",
    data: result,
  });
});

//delete answer
const deleteAnswer = catchAsync(async (req: Request, res: Response) => {
  const { testAttemptId, questionId } = req.body;
  const result = await AnswerService.deleteAnswer(testAttemptId, questionId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Answer deleted successfully",
    data: result,
  });
});

export const AnswerController = {
  submitAnswer,
  getAnswer,
  getAnswersByTestAttempt,
  updateAnswer,
  deleteAnswer,
};
