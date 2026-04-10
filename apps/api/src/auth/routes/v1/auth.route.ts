import { Router } from "express";
import * as authController from "../../controllers/auth.controller";

export const authRouter = Router() as Router;

authRouter.route("/callback").get(authController.kakaoCheckCode);

authRouter.route("/kakao").get(authController.kakaoAuthRedirect);
