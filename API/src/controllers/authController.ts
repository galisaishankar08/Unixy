import e, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { userService } from '@unixy/db';
import { generateToken, generateRefreshToken, generateResetPasswordToken, verifyResetPasswordToken } from '../utils/jwtUtils';
import sendEmail from '../utils/sendEmail';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        // Check if the user already exists
        const existingUser = await userService.getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await userService.createUser(email, hashedPassword, name);

        // Generate a JWT token for the new user
        const token = generateToken(newUser.id); // Access token
        const refreshToken = generateRefreshToken(newUser.id); // Refresh token

        // Send response
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name
            },
            token,
            refreshToken
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = generateToken(user.id); // Access token
        const refreshToken = generateRefreshToken(user.id); // Refresh token
        return res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
  
      // Check if user exists
      const user = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const token = generateResetPasswordToken(user.id);
  
      // Send email with the reset link
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await sendEmail(email, 'Password Reset Request', `Reset your password here: ${resetLink}`);
  
      return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } catch (error) {
      console.error('Error in forgotPassword:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
  
      // Verify the token
      const decoded = verifyResetPasswordToken(token);
      if(decoded?.userId){
          const userId = decoded.userId;

          // Hash the new password
          const hashedPassword = await bcrypt.hash(newPassword, 10);
      
          // Update the user's password
          await userService.updatePassword(userId, hashedPassword);
      
          return res.status(200).json({ message: 'Password has been reset successfully.' });
      }else{
            return res.status(400).json({ message: 'Invalid token' });
    }
  
    } catch (error) {
      console.error('Error in resetPassword:', error);
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  