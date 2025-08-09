import { Router } from "express";
import { testattemptController } from "./TestAttempt.controller";

const router = Router();

//determineLevelAndBlocking
router.get(
    "/determineLevelAndBlocking",
    testattemptController.determineLevelAndBlocking
);

//startTestAttempt
router.post(
    "/startTestAttempt",
    testattemptController.startTestAttempt
);

//getTestAttemptById
router.get(
    "/getTestAttemptById/:id",
    testattemptController.getTestAttemptById
);

//getActiveTestAttempt
router.get(
    "/getActiveTestAttempt/:userId",
    testattemptController.getActiveTestAttempt
);

//completeTestAttempt
router.post(
    "/completeTestAttempt",
    testattemptController.completeTestAttempt
);

//autoSubmitExpiredTest
router.post(
    "/autoSubmitExpiredTest",
    testattemptController.autoSubmitExpiredTest
);

//getTestResults
router.get(
    "/getTestResults/:testAttemptId",
    testattemptController.getTestResults
)
    //test attempp by user
router.get(
    "/getTestAttemptsByUser/:userId",
    testattemptController.getTestAttemptsByUser
)

//getTestAttemptsByStep
router.get(
    "/getTestAttemptsByStep/:step",
    testattemptController.getTestAttemptsByStep
)
// create testattempt

// update testattempt
router.put("/:id", testattemptController.updateTestAttempt);

// delete testattempt
router.delete("/:id", testattemptController.deleteTestAttempt);

export const testattemptRoutes = router;
