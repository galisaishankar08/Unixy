"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMD5Hash = exports.generateMD5Hash = void 0;
const crypto_1 = require("crypto");
// Function to generate MD5 hash
const generateMD5Hash = (input) => {
    const hash = (0, crypto_1.createHash)('md5');
    hash.update(input);
    return hash.digest('hex'); // Returns the hash as a hexadecimal string
};
exports.generateMD5Hash = generateMD5Hash;
// Function to verify MD5 hash
const verifyMD5Hash = (password, hashedPassword) => {
    const generatedHash = (0, exports.generateMD5Hash)(password);
    return generatedHash === hashedPassword;
};
exports.verifyMD5Hash = verifyMD5Hash;
