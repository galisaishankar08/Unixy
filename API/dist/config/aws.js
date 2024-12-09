"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Load AWS credentials from environment variables or default profiles
aws_sdk_1.default.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '', // Replace with your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '', // Replace with your AWS Secret Access Key
    region: process.env.AWS_REGION || 'ap-south-1', // Set your region
});
exports.default = aws_sdk_1.default;
