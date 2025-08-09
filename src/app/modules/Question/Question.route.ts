import { Router } from "express";
import { questionController } from "./Question.controller";

const router = Router();

// create question
router.post("/create", questionController.createQuestion);

//bulkCreateQuestions
router.post("/bulkCreateQuestions", questionController.bulkCreateQuestions);

//getQuestionsByCompetencyAndLevel
router.get(
    "/getQuestionsByCompetencyAndLevel",
    questionController.getQuestionsByCompetencyAndLevel
);

// get all question
router.get("/", questionController.getAllQuestions);

// get single question by id
router.get("/:id", questionController.getQuestionById);

// update question
router.put("/:id", questionController.updateQuestion);

// delete question
router.delete("/:id", questionController.deleteQuestion);

export const questionRoutes = router;
