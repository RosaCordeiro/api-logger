import { LogLevelEnum } from '@/core/domain/log/log.entity';
import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDate, MinLength, MaxLength, IsEnum } from 'class-validator';

export class CreateLogDTO {
    @IsDate()
    @IsOptional()
    @Transform(({ value }) => (value ? new Date(value) : undefined))
    timestamp?: Date;

    @IsEnum(LogLevelEnum)
    @IsOptional()
    level?: LogLevelEnum;

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    serviceId?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    environment?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    host?: string;

    @IsString()
    @MinLength(3)
    @MaxLength(500)
    action?: string;

    @IsString()
    message?: string;
}