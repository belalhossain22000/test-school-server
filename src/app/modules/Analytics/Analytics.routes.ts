// Analytics.routes: Module file for the Analytics.routes functionality.
import express from "express";
import { AnalyticsController } from "./Analytics.controller";


const router = express.Router();

router.get(
    "/getSystemStats",
    AnalyticsController.getSystemStats
);

router.get(
    "/getCertificationDistribution",
    AnalyticsController.getCertificationDistribution
);

router.get(
    "/getCompetencyPerformance",
    AnalyticsController.getCompetencyPerformance
);

router.get(
    "/getTestStepStats",
    AnalyticsController.getTestStepStats
);

router.get(
    "/getDailyTestStats",
    AnalyticsController.getDailyTestStats
);

export const analyticsRoutes = router;