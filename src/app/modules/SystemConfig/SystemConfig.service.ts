import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const getSystemConfig = async () => {
  let config = await prisma.systemConfig.findFirst();

  if (!config) {
    // Create default config if none exists
    config = await prisma.systemConfig.create({
      data: {
        defaultTimePerQuestion: 60,
        step1TimeLimit: 2640, // 44 questions × 60 seconds
        step2TimeLimit: 2640,
        step3TimeLimit: 2640,
        allowRetakeAfterFail: false,
        passingScoreStep1: 25.0,
        passingScoreStep2: 25.0,
        passingScoreStep3: 25.0,
      },
    });
  }

  return config;
};
// Update system configuration
export const updateSystemConfig = async (
  data: Partial<{
    defaultTimePerQuestion: number;
    step1TimeLimit: number;
    step2TimeLimit: number;
    step3TimeLimit: number;
    allowRetakeAfterFail: boolean;
    passingScoreStep1: number;
    passingScoreStep2: number;
    passingScoreStep3: number;
  }>
) => {
  const config = await getSystemConfig();

  return await prisma.systemConfig.update({
    where: { id: config.id },
    data,
  });
};


export const systemconfigService = {
  updateSystemConfig,
  getSystemConfig,
};
