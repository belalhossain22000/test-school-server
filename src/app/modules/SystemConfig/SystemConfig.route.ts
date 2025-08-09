import { Router } from "express";
import { systemconfigController } from "./SystemConfig.controller";

const router = Router();

// get all systemconfig
router.get("/", systemconfigController.getSystemConfig);



// update systemconfig
router.put("/", systemconfigController.updateSystemConfig);



export const systemconfigRoutes = router;
