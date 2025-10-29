import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLogUseCase } from "@/core/application/useCases/logger/create-log.use-case";
import { CreateLogDTO } from "../dtos/log/create-log.dto";

export class LogController {
    async createLog(req: Request, res: Response) {
        try {
            const createLogUseCase = container.resolve(
                CreateLogUseCase
            )
            const logData: CreateLogDTO = req.body;

            const logCreated = createLogUseCase.execute(logData);

            if (!logCreated) {
                throw new Error('Log could not be created');
            }

            res.status(201).send();
        } catch (error) {
            console.log('caiu aqui')
            res.status(400).json({ error: error.message });
        }
    }
}