import { Request, Response } from 'express';
import { User } from '../interfaces';
import { userService } from '@unixy/db'

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // Get user ID from the request (added by `verifyToken`)
    const { userId } = req.body;

    if (!userId) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResult = await userService.getUserById(userId);
    if (!userResult) {
        return res.status(404).json({ message: 'User not found' });
    }
    const user:User = userResult as User;
    
    // console.log(user);
    return res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
