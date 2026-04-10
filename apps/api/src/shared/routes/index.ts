import { Request, Response, NextFunction, Router } from "express";
import authRouter from "../../auth/routes";
import { validateJwt } from "../middlewares/validate-jwt.middleware";

const { APP_NAME } = process.env;
const router = Router() as Router;

const jwtExcludedPaths: { method: string; path: string }[] = [
  { method: "GET", path: "/auth/callback" },
  { method: "GET", path: "/auth/kakao" },
  { method: "POST", path: "/auth/refresh" },
];

const unless =
  (
    paths: typeof jwtExcludedPaths,
    middleware: (req: Request, res: Response, next: NextFunction) => any,
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    for (const e of paths)
      if (req.method.toUpperCase() === e.method && req.path.includes(e.path))
        return next();
    return middleware(req, res, next);
  };

router.use(
  `/api/${APP_NAME}`,
  unless(jwtExcludedPaths, validateJwt("validate-access-jwt")),
  [authRouter],
);

export { router as sharedRouter };
