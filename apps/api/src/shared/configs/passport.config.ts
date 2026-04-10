import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback,
} from "passport-jwt";

import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  STATUS_CODES,
} from "../constants";
import { HttpError } from "../errors/http-error";
import { TokenError } from "../errors/token-error";
import { compareHash } from "../utils/crypto"; // TODO: use make password when user sign up
import { prisma } from "@template/database";

const accessJwtStrategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req?.cookies?.accessToken,
  ]),
  secretOrKey: ACCESS_TOKEN_SECRET,
  ignoreExpiration: true,
};
const refreshJwtStrategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req?.cookies?.refreshToken,
  ]),
  secretOrKey: REFRESH_TOKEN_SECRET,
  ignoreExpiration: true,
};

const verifyAccessJwt: VerifyCallback = async (payload, done) => {
  try {
    const now = Date.now();
    const { id, issuedAt, expiredIn } = payload;

    if (now > issuedAt + expiredIn)
      return done(new TokenError(STATUS_CODES.FORBIDDEN, true, false), false);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return done(new HttpError(STATUS_CODES.NOT_FOUND), false);

    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err, false);
  }
};

const verifyRefreshJwt: VerifyCallback = async (payload, done) => {
  try {
    const now = Date.now();
    const { id, issuedAt, expiredIn } = payload;

    if (now > issuedAt + expiredIn)
      return done(new TokenError(STATUS_CODES.FORBIDDEN, true, true), false);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return done(new HttpError(STATUS_CODES.NOT_FOUND), false);

    return done(null, user);
  } catch (err) {
    console.error(err);
    done(err, false);
  }
};

export const accessJwtStrategy = new JwtStrategy(
  accessJwtStrategyOptions,
  verifyAccessJwt,
);
export const refreshJwtStrategy = new JwtStrategy(
  refreshJwtStrategyOptions,
  verifyRefreshJwt,
);
