import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { testattemptService } from "./TestAttempt.service";



const updateTestAttempt = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.updateTestAttempt(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt updated successfully",
    data: result,
  });
});

const deleteTestAttempt = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.deleteTestAttempt(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt deleted successfully",
    data: result,
  });
});

//determineLevelAndBlocking
const determineLevelAndBlocking = catchAsync(
  async (req: Request, res: Response) => {
    const { step, score } = req.query;
    const result = await testattemptService.determineLevelAndBlocking(
      step as any,
      score as any
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "TestAttempt retrieved successfully",
      data: result,
    });
  }
);

//startTestAttempt
const startTestAttempt = catchAsync(async (req: Request, res: Response) => {
  const { userId, step } = req.body;
  const result = await testattemptService.startTestAttempt(userId, step);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt started successfully",
    data: result,
  });
});

//getTestAttemptById
const getTestAttemptById = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.getTestAttemptById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt retrieved successfully",
    data: result,
  });
});

//getActiveTestAttempt
const getActiveTestAttempt = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.getActiveTestAttempt(req.params.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt retrieved successfully",
    data: result,
  });
})

//completeTestAttempt
const completeTestAttempt = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.completeTestAttempt(req.params.testAttemptId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt completed successfully",
    data: result,
  });
})

//autoSubmitExpiredTest
const autoSubmitExpiredTest = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.autoSubmitExpiredTest(req.params.testAttemptId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt submitted successfully",
    data: result,
  });
})

//getTestResults
const getTestResults = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.getTestResults(req.params.testAttemptId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt retrieved successfully",
    data: result,
  });
})

//getTestAttemptsByUser
const getTestAttemptsByUser = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.getTestAttemptsByUser(req.params.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt retrieved successfully",
    data: result,
  });
})

//getTestAttemptsByStep
const getTestAttemptsByStep = catchAsync(async (req: Request, res: Response) => {
  const result = await testattemptService.getTestAttemptsByStep(req?.params?.step as any);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "TestAttempt retrieved successfully",
    data: result,
  });
})



export const testattemptController = {
  updateTestAttempt,
  deleteTestAttempt,
  determineLevelAndBlocking,
  startTestAttempt,
  getTestAttemptById,
  getActiveTestAttempt,
  completeTestAttempt,
  autoSubmitExpiredTest,
  getTestResults,
  getTestAttemptsByUser,
  getTestAttemptsByStep
};
