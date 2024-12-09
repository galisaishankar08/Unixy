"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = log;
exports.info = info;
exports.warn = warn;
exports.error = error;
const winston_1 = __importDefault(require("winston"));
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
const config_1 = require("./config");
// AWS CloudWatch configuration
const AWS_REGION = process.env.AWS_REGION || 'ap-south-1';
const LOG_GROUP_NAME = process.env.CLOUDWATCH_LOG_GROUP || 'MyAppLogGroup';
const LOG_STREAM_NAME = process.env.CLOUDWATCH_LOG_STREAM || 'MyAppLogStream';
// Add the CloudWatch transport to Winston
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
    ],
});
// Add CloudWatch transport if not in test mode
if (!config_1.TEST) {
    logger.add(new winston_cloudwatch_1.default({
        awsRegion: AWS_REGION,
        logGroupName: LOG_GROUP_NAME,
        logStreamName: LOG_STREAM_NAME,
        jsonMessage: true,
    }));
}
// Log helper functions
function log(message, ...optionalParams) {
    logger.info(message, optionalParams);
}
function info(message, ...optionalParams) {
    logger.info(`[INFO]: ${message}`, optionalParams);
}
function warn(message, ...optionalParams) {
    logger.warn(`[WARN]: ${message}`, optionalParams);
}
function error(message, ...optionalParams) {
    logger.error(`[ERROR]: ${message}`, optionalParams);
}
// Exported logging object
const logging = {
    log,
    info,
    warn,
    error,
};
// Link the local and global variable
globalThis.logging = logging;
exports.default = logging;
