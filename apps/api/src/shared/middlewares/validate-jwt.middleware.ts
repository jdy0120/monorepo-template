import passport from "passport";
import { NextFunction, Request, Response } from "express";
import { TokenError } from "../errors/token-error";
import tokenService from "../../auth/services/token.service";
import * as CONST from "../constants";

export const validateJwt =
  (strategy: "validate-access-jwt" | "validate-refresh-jwt") =>
  (req: Request, res: Response, next: NextFunction) =>
    passport.authenticate(
      strategy,
      { session: false },
      (
        err: any,
        user?: Express.User | false | null,
        info?: object | string | Array<string | undefined>,
        _status?: number | Array<number | undefined>,
      ) => {
        if (err) {
          console.error("Authentication error:", err);

          if (
            strategy === "validate-access-jwt" &&
            err instanceof TokenError &&
            err.isAccessTokenExpired
          ) {
            // Attempt to use refresh token
            return passport.authenticate(
              "validate-refresh-jwt",
              { session: false },
              (refreshErr: any, refreshUser?: Express.User | false | null) => {
                if (refreshErr || !refreshUser) {
                  return next(refreshErr || err);
                }

                // If refresh token is valid, reissue tokens
                const tokens = tokenService.issueJsonTokensWithId(
                  (refreshUser as any).id,
                );

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

                req.user = refreshUser;
                return next();
              },
            )(req, res, next);
          }

          return next(err);
        }
        if (info) {
          console.warn("Authentication info:", info);
          if (info instanceof Error) return next(info);
        }
        if (user) {
          console.log("Authenticated user:", user);
          req.user = user;
        }

        return next();
      },
    )(req, res, next);
