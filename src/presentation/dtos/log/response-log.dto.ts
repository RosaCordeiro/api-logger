import { Log, TLogLevelEnum } from "@/core/entities/log.entity";

export class ResponseLogDTO {
    id?: string;
    timestamp: Date;
    level: TLogLevelEnum;
    serviceId: string;
    environment: string;
    host: string;
    action: string;
    message: string;

    constructor(props: Log) {
        this.id = props.id;
        this.timestamp = props.timestamp;
        this.level = props.level;
        this.serviceId = props.serviceId;
        this.environment = props.environment;
        this.host = props.host;
        this.action = props.action;
        this.message = props.message;
    }
}