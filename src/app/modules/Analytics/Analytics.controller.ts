// Analytics.controller: Module file for the Analytics.controller functionality.
// getSystemStats

import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AnalyticsService } from "./Analytics.service";

const getSystemStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AnalyticsService.getSystemStats();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "System stats retrieved successfully",
        data: result,
    });
});


//getCertificationDistribution

const getCertificationDistribution = catchAsync(async (req: Request, res: Response) => {
    const result = await AnalyticsService.getCertificationDistribution();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Certification distribution retrieved successfully",
        data: result,
    });
});


//getCompetencyPerformance

const getCompetencyPerformance = catchAsync(async (req: Request, res: Response) => {
    const result = await AnalyticsService.getCompetencyPerformance();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Certification distribution retrieved successfully",
        data: result,
    });
});

//getTestStepStats

const getTestStepStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AnalyticsService.getTestStepStats();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Certification distribution retrieved successfully",
        data: result,
    });
});

//getDailyTestStats

const getDailyTestStats = catchAsync(async (req: Request, res: Response) => {
    const result = await AnalyticsService.getDailyTestStats();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Certification distribution retrieved successfully",
        data: result,
    });
});

export const AnalyticsController = {
    getSystemStats,
    getCertificationDistribution,
    getCompetencyPerformance,
    getTestStepStats,
    getDailyTestStats
};