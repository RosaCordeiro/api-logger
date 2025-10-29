import { Router } from "express";
import { LogController } from "../controllers/log.controller";
import { CreateLogDTO } from "../dtos/log/create-log.dto";
import { validationDTOMidleware } from "@/shared/middlewares/validationDTOMidleware";

const logRouter = Router();

const logController =
    new LogController();

logRouter.post(
    "/create",
    validationDTOMidleware(CreateLogDTO),
    logController.createLog
);

export { logRouter }