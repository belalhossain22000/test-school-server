import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const createCompetency = async (data: any) => {
  //if you wanna add logic here
  const result = await prisma.competency.create({ data });
  return result;
};

const getAllCompetencys = async (query: Record<string, any>) => {
  const result = await prisma.competency.findMany({
    orderBy: { order: "asc" },
    include: {
      questions: {
        where: { isActive: true },
        select: { id: true, level: true },
      },
    },
  });
  return result;
};

const getSingleCompetency = async (id: string) => {
  const result = await prisma.competency.findUnique({
    where: { id },
    include: {
      questions: {
        where: { isActive: true },
        orderBy: { level: "asc" },
      },
    },
  });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Competency not found..!!");
  }
  return result;
};

const updateCompetency = async (id: string, data: any) => {
  const existingCompetency = await prisma.competency.findUnique({
    where: { id },
  });
  if (!existingCompetency) {
    throw new ApiError(httpStatus.NOT_FOUND, "Competency not found..!!");
  }
  const result = await prisma.competency.update({ where: { id }, data });
  return result;
};

const deleteCompetency = async (id: string) => {
  const existingCompetency = await prisma.competency.findUnique({
    where: { id },
  });
  if (!existingCompetency) {
    throw new ApiError(httpStatus.NOT_FOUND, "Competency not found..!!");
  }
  const result = await prisma.competency.delete({ where: { id } });
  return null;
};

// Get competencies with question count by level
 const getCompetenciesWithQuestionCount = async () => {
  return await prisma.competency.findMany({
    include: {
      questions: {
        where: { isActive: true },
        select: { level: true }
      }
    }
  });
};

export const competencyService = {
  createCompetency,
  getAllCompetencys,
  getSingleCompetency,
  updateCompetency,
  deleteCompetency,
  getCompetenciesWithQuestionCount
};
