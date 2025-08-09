// Answer.routes: Module file for the Answer.routes functionality.
import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AnswerController } from "./Answer.controller";

const router = express.Router();

router.post(
  "/submit",

  AnswerController.submitAnswer
);

router.get(
  "/getAnswersByTestAttempt/:testAttemptId",
  AnswerController.getAnswersByTestAttempt
);

router.get(
  "/getAnswer",

  AnswerController.getAnswer
);

router.put(
  "/updateAnswer",

  AnswerController.updateAnswer
);

router.delete(
  "/deleteAnswer",

  AnswerController.deleteAnswer
);

export const AnswerRoutes = router;
