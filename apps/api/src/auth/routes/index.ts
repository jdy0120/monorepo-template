import { Router } from "express";

import * as v1Router from "./v1";

const router = Router() as Router;

router.use("/auth", [
  ...Object.entries(v1Router).map(([_, value]) => value),
]);

export default router;
