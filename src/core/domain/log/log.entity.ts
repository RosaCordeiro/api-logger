export enum LogLevelEnum {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}
export type TLogLevelEnum = `${LogLevelEnum}`;

export interface ILog {
    id?: string;
    timestamp: Date;
    level: TLogLevelEnum;
    serviceId: string;
    environment: string;
    host: string;
    action: string;
    message: string;
}

export class Log {
    public readonly id?: string;
    public readonly timestamp: Date;
    public readonly level: TLogLevelEnum
    public readonly serviceId: string;
    public readonly environment: string
    public readonly host: string;
    public readonly action: string
    public readonly message: string;

    constructor(props: ILog) {
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