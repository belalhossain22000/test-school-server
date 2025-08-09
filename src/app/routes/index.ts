import express from "express";
import { userRoutes } from "../modules/User/user.route";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ImageRoutes } from "../modules/Image/Image.routes";
import { OtpRoutes } from "../modules/Otp/Otp.routes";
import { competencyRoutes } from "../modules/Competency/Competency.route";
import { questionRoutes } from "../modules/Question/Question.route";
import { systemconfigRoutes } from "../modules/SystemConfig/SystemConfig.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/images",
    route: ImageRoutes,
  },
  {
    path: "/otp",
    route: OtpRoutes,
  },
  {
    path: "/competency",
    route: competencyRoutes,
  },
  {
    path: "/questions",
    route: questionRoutes,
  },
  {
    path: "/systemconfig",
    route: systemconfigRoutes,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
