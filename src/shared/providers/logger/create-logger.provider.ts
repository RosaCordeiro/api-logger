import pino, { Logger } from 'pino';
import { createStream } from 'rotating-file-stream';
import fs from 'fs';
import { PassThrough } from 'stream';

interface LoggerOptions {
    logDir?: string;
    fileName?: string;
    pretty?: boolean;
    maxSize?: `${number}B` | `${number}K` | `${number}M` | `${number}G`;
    rotateInterval?: `${number}M` | `${number}d` | `${number}h` | `${number}m` | `${number}s`;
    maxFiles?: number;
}

export class LoggerProvider {
    private logger: Logger;

    constructor(options: LoggerOptions = {}) {
        const {
            logDir = './logs',
            fileName = 'app.log',
            pretty = false,
            maxSize = '10M',
            rotateInterval = '1d',
            maxFiles = 7,
        } = options;

        // Garante que a pasta exista
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // Cria o stream de rotação (writable)
        const rotatingStream: NodeJS.WritableStream = createStream(fileName, {
            path: logDir,
            size: maxSize,
            interval: rotateInterval,
            maxFiles,
            compress: 'gzip',
        });

        // Se precisar de saída legível em STDOUT (dev), encaminha para stdout + arquivo.
        // Evita pino.transport (que usa Worker e causa DataCloneError ao receber streams).
        let destinationStream: NodeJS.WritableStream = rotatingStream;
        if (pretty) {
            const tee = new PassThrough();
            tee.pipe(process.stdout);
            tee.pipe(rotatingStream);
            destinationStream = tee;
        }

        // Cria o logger usando o stream diretamente (sem transport worker)
        this.logger = pino(
            {
                level: 'info',
                base: undefined,
                timestamp: pino.stdTimeFunctions.isoTime,
            },
            destinationStream
        );
    }

    public info(message: string, context: Record<string, unknown> = {}): void {
        this.logger.info(context, message);
    }

    public warn(message: string, context: Record<string, unknown> = {}): void {
        this.logger.warn(context, message);
    }

    public error(message: string, context: Record<string, unknown> = {}): void {
        this.logger.error(context, message);
    }

    public debug(message: string, context: Record<string, unknown> = {}): void {
        this.logger.debug(context, message);
    }

    public setLevel(level: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace'): void {
        this.logger.level = level;
    }
}
