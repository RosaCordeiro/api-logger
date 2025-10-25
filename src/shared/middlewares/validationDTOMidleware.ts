import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationDTOMidleware(type: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);

        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const message = errors
                    .map(error => Object.values(error.constraints || {}))
                    .join(', ');
                return res.status(400).json({ error: message });
            }

            req.body = dto;
            next();
        });
    };
}