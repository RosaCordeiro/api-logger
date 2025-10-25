import { Router } from "express";
import { LogController } from "../controllers/LogController";
import { CreateLogDTO } from "../dtos/log/CreateLogDTO";
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