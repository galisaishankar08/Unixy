import winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';
import { TEST } from './config';

// AWS CloudWatch configuration
const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';
const LOG_GROUP_NAME = process.env.CLOUDWATCH_LOG_GROUP || 'MyAppLogGroup';
const LOG_STREAM_NAME = process.env.CLOUDWATCH_LOG_STREAM || 'MyAppLogStream';

// Add the CloudWatch transport to Winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

// Add CloudWatch transport if not in test mode
if (!TEST) {
    logger.add(
        new WinstonCloudWatch({
            awsRegion: AWS_REGION,
            logGroupName: LOG_GROUP_NAME,
            logStreamName: LOG_STREAM_NAME,
            jsonMessage: true,
        })
    );
}

// Log helper functions
export function log(message?: any, ...optionalParams: any[]) {
    logger.info(message, optionalParams);
}

export function info(message?: any, ...optionalParams: any[]) {
    logger.info(`[INFO]: ${message}`, optionalParams);
}

export function warn(message?: any, ...optionalParams: any[]) {
    logger.warn(`[WARN]: ${message}`, optionalParams);
}

export function error(message?: any, ...optionalParams: any[]) {
    logger.error(`[ERROR]: ${message}`, optionalParams);
}

// Exported logging object
const logging = {
    log,
    info,
    warn,
    error,
};

// Global definition for `logging`
declare global {
    var logging: {
        log: (message?: any, ...optionalParams: any[]) => void;
        info: (message?: any, ...optionalParams: any[]) => void;
        warn: (message?: any, ...optionalParams: any[]) => void;
        error: (message?: any, ...optionalParams: any[]) => void;
    };
}

// Link the local and global variable
globalThis.logging = logging;

export default logging;
