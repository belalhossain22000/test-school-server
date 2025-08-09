import { Router } from "express";
import { competencyController } from "./Competency.controller";
import validateRequest from "../../middlewares/validateRequest";
import { competencyCreateSchema, competencyUpdateSchema } from "./Competency.validation";

const router = Router();

// create competency
router.post("/create", validateRequest(competencyCreateSchema), competencyController.createCompetency);

// get all competency
router.get("/", competencyController.getAllCompetencys);

// get single competency by id
router.get("/:id", competencyController.getSingleCompetency);

// update competency
router.put("/:id",validateRequest(competencyUpdateSchema), competencyController.updateCompetency);

// delete competency
router.delete("/:id", competencyController.deleteCompetency);

export const competencyRoutes = router;
