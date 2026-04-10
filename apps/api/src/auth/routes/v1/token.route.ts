import { Router } from "express";
import * as tokenController from "../../controllers/token.controller";
import {
  tryCatchAsync,
  validateJwt,
} from "../../../shared/middlewares";

export const tokenRouter = Router() as Router;

tokenRouter.post(
  "/refresh",
  validateJwt("validate-refresh-jwt"),
  tryCatchAsync(tokenController.validateRefreshToken),
);
