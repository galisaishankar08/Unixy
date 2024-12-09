import { createHash } from 'crypto';

// Function to generate MD5 hash
export const generateMD5Hash = (input: string) => {
  const hash = createHash('md5');
  hash.update(input);
  return hash.digest('hex');  // Returns the hash as a hexadecimal string
};

// Function to verify MD5 hash
export const verifyMD5Hash = (password: string, hashedPassword:string) => {
  const generatedHash = generateMD5Hash(password);
  return generatedHash === hashedPassword;
};
