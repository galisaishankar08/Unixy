import AWS from 'aws-sdk';

// Load AWS credentials from environment variables or default profiles
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '', // Replace with your AWS Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '', // Replace with your AWS Secret Access Key
  region: process.env.AWS_REGION || 'ap-south-1', // Set your region
});

export default AWS;
