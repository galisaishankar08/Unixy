import jwt, { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadCustom {
  userId: string;
  iat?: number; // Issued At (optional, provided by JWT)
  exp?: number; // Expiry Time (optional, provided by JWT)
}

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your_refresh_token_secret';

// Generate an access token
export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
};

// Generate a refresh token
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

// Verify the access token
export const verifyToken = (token: string):JwtPayloadCustom | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayloadCustom;
  } catch (error) {
    return null;
  }
};

// Verify the refresh token
export const verifyRefreshToken = (token: string):JwtPayloadCustom | null => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayloadCustom;
  } catch (error) {
    return null;
  }
};

// Generate a Reset Password Token
export const generateResetPasswordToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.RESET_PASSWORD_SECRET || 'your_reset password_secret', { expiresIn: '1h' });
}

// verify the Reset Password Token
export const verifyResetPasswordToken = (token: string):JwtPayloadCustom | null => {
  try {
    return jwt.verify(token, process.env.RESET_PASSWORD_SECRET || 'your_reset password_secret') as JwtPayloadCustom;
  } catch (error) {
    return null;
  }
}