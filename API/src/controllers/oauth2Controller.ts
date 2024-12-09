import { Request, Response } from 'express';
import { userService } from '@unixy/db';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwtUtils';


export const generateAccessToken = async (req: Request, res: Response) => {
    try {
      // const { refreshToken } = req.body;
      // Get the token from the Authorization header
      const authHeader = req.headers.authorization;
        
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ message: 'Authorization token is required' });
      }
  
      const refreshToken = authHeader.split(' ')[1]; // Extract the token after "Bearer"
  
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
  
      // Verify the refresh token
      const decoded = verifyRefreshToken(refreshToken);
      if (!decoded || !decoded.userId) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
  
      // Generate a new access token
      const newAccessToken = generateToken(decoded.userId);
  
      return res.json({ token: newAccessToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

export const googleAuthCallback = async (req: Request, res: Response) => {
    const { email, googleId, name } = req.user as any;
    let user = await userService.getUserByGoogleId(googleId);

    if (!user) {
        user = await userService.createUserWithGoogle(email, googleId, name);
    }

    const accessToken = generateToken(user.id); // Access token
    const refreshToken = generateRefreshToken(user.id); // Refresh token
    res.json({ accessToken, refreshToken });
};
