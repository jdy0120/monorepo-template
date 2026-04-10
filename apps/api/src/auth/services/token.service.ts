import { Request } from "express";

import {
  generateAccessToken,
  generateRefreshToken,
  generateSignUpToken,
} from "../../shared/utils";

const issueJsonTokensWithId = (id: string) => {
  const issuedAt = Date.now();
  const accessToken = generateAccessToken({ id, issuedAt });
  const refreshToken = generateRefreshToken({ id, issuedAt });

  return { accessToken, refreshToken };
};

const issueJSONWebTokens = (req: Request, socialAccountId?: string) => {
  const id = req.user?.id ?? socialAccountId;
  const issuedAt = Date.now();
  const accessToken = generateAccessToken({ id, issuedAt });
  const refreshToken = generateRefreshToken({ id, issuedAt });

  return { accessToken, refreshToken };
};

const issueSignUpToken = (id: number) => {
  const issuedAt = Date.now();
  const signUpToken = generateSignUpToken({ id, issuedAt });

  return { signUpToken };
};

export default {
  issueJsonTokensWithId,
  issueJSONWebTokens,
  issueSignUpToken,
};
