import { LoggerProvider } from './create-logger.provider';

export const logger = new LoggerProvider({
    pretty: process.env.NODE_ENV !== 'production',
    logDir: './logs',
    maxSize: '5M',
    rotateInterval: '1d',
    maxFiles: 10,
});
