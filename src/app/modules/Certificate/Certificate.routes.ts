// Certificate.routes: Module file for the Certificate.routes functionality.
import express from "express";
import validateRequest from "../../middlewares/validateRequest";


import { certificateController } from "./Certificate.controller";

const router = express.Router();

router.post(
    "/create",
  
    certificateController.createCertificate
);

router.get(
    "/getCertificateById/:id",

    certificateController.getCertificateById
);

router.get(
    "/getCertificatesByUser/:userId",

    certificateController.getCertificatesByUser
);

router.get(
    "/getActiveCertificates/:userId",
 
    certificateController.getActiveCertificates
);

router.put(
    "/updateCertificate/:id",
 
    certificateController.updateCertificate
);  

router.delete(
    "/deleteCertificate/:id",
 
    certificateController.deleteCertificate 
)

export const CertificateRoutes = router;