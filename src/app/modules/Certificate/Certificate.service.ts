import { SkillLevel } from "@prisma/client";
import prisma from "../../../shared/prisma";

// Generate certificate PDF (placeholder - implement with your PDF library)
const generateCertificatePDF = async (certificate: any): Promise<string> => {
  // Implement PDF generation logic here
  // Return URL to the generated PDF
  return `/certificates/${certificate.id}.pdf`;
};

// Generate certificate
const generateCertificate = async (data: {
  userId: string;
  testAttemptId: string;
  level: SkillLevel;
  score: number;
}) => {
  // Deactivate previous certificates for this user
  await prisma.certificate.updateMany({
    where: { userId: data.userId },
    data: { isActive: false },
  });

  // Create new certificate
  const certificate = await prisma.certificate.create({
    data: {
      userId: data.userId,
      testAttemptId: data.testAttemptId,
      level: data.level,
      score: data.score,
      isActive: true,
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });

  // Generate PDF URL
  const certificateUrl = await generateCertificatePDF(certificate);

  // Update certificate with PDF URL
  return await prisma.certificate.update({
    where: { id: certificate.id },
    data: { certificateUrl },
  });
};

// Get certificate by ID
const getCertificateById = async (id: string) => {
  return await prisma.certificate.findUnique({
    where: { id },
    include: {
      user: {
        select: { name: true, email: true },
      },
      testAttempt: {
        select: { step: true, completedAt: true, score: true },
      },
    },
  });
};

// Get certificates by user
const getCertificatesByUser = async (userId: string) => {
  return await prisma.certificate.findMany({
    where: { userId },
    orderBy: { issuedAt: "desc" },
    include: {
      testAttempt: {
        select: { step: true, completedAt: true },
      },
    },
  });
};

// Get active certificates
const getActiveCertificates = async () => {
  return await prisma.certificate.findMany({
    where: { isActive: true },
    include: {
      user: {
        select: { name: true, email: true },
      },
      testAttempt: {
        select: { step: true, completedAt: true },
      },
    },
    orderBy: { issuedAt: "desc" },
  });
};

// Update certificate
const updateCertificate = async (
  id: string,
  data: Partial<{
    certificateUrl: string;
    isActive: boolean;
  }>
) => {
  return await prisma.certificate.update({
    where: { id },
    data,
  });
};

// Delete certificate
const deleteCertificate = async (id: string) => {
  return await prisma.certificate.delete({
    where: { id },
  });
};

// Get certificate statistics
const getCertificateStats = async () => {
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


export const CertificateService = {
  generateCertificate,
  getCertificateById,
  getCertificatesByUser,
  getActiveCertificates,
  updateCertificate,
  deleteCertificate,
  getCertificateStats,
};