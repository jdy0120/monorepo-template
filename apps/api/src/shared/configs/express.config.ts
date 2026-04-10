import express, { Express } from "express";
import { sharedRouter } from "../routes";
import compression from "compression";
import helmet from "helmet";
import passport from "passport";
import cors from "cors";
import {
  accessJwtStrategy,
  refreshJwtStrategy,
} from "./passport.config";
import cookieParser from "cookie-parser";
// import { resourcePath } from "../utils";
import { errorConverter, errorHandler } from "../middlewares";

const app = express() as Express;

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(compression());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(passport.initialize());

passport.use("validate-access-jwt", accessJwtStrategy);
passport.use("validate-refresh-jwt", refreshJwtStrategy);
// Routes
app.use("/", sharedRouter);
// app.use("/resources", express.static(resourcePath));

app.use(errorConverter);
app.use(errorHandler);

export default app;
