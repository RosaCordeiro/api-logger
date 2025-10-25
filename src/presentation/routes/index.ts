import { Router } from "express";
import { outrosRouter } from "./outros.routes";
import { logRouter } from "./log.routes";

const router = Router();

router.use('/', outrosRouter);
router.use('/log', logRouter);

export { router };