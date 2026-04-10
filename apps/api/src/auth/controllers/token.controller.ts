import { Request, Response } from "express";

import tokenService from "../services/token.service";
import { STATUS_CODES } from "../../shared/constants";
import { BaseResponse } from "../../shared/types";
import { getResponsePhrase } from "../../shared/utils";
import * as CONST from "../../shared/constants";

const validateRefreshToken = async (req: Request, res: Response) => {
  const tokens = tokenService.issueJSONWebTokens(req);

  req.statusCode = STATUS_CODES.CREATED;

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

  return <BaseResponse>{
    result: true,
    message: getResponsePhrase(STATUS_CODES.CREATED),
  };
};

export { validateRefreshToken };
