import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import * as CONST from "../../shared/constants";

const kakaoAuthRedirect = async (req: Request, res: Response) => {
  const kakaoAuthUrl = await authService.getKakaoAuthUrl();
  res.redirect(kakaoAuthUrl);
};

const kakaoCheckCode = async (req: Request, res: Response) => {
  const { code } = req.query;

  const tokens = await authService.kakaoCheckCode(code as string);

  res.cookie("accessToken", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: CONST.ACCESS_TOKEN_EXPIRED_IN_MILL_SEC,
  });
  res.cookie("refreshToken", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: CONST.REFRESH_TOKEN_EXPIRED_IN_MILL_SEC,
    // path: `/api/${process.env.APP_NAME}/auth/refresh`,
  });

  res.redirect(`${process.env.WEB_URL}/auth/success`);
};

export { kakaoAuthRedirect, kakaoCheckCode };
