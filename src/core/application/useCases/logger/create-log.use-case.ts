import { LogLevelEnum } from "@/core/domain/log/log.entity";
import { CreateLogDTO } from "@/presentation/dtos/log/create-log.dto";
import { logger } from "@/shared/providers/logger/logger.provider";

export class CreateLogUseCase {
	execute(logData: CreateLogDTO): Boolean {
		logData.level = logData.level || LogLevelEnum.INFO;
		logData.timestamp = new Date();

		try {
			logger[logData.level.toLowerCase()](logData);
		} catch (error) {
			console.error('Failed to initialize logger:', error);
			return false;
		}

		return true;
	}
}