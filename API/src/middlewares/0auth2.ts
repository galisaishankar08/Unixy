import { Request, Response, NextFunction } from 'express';
import { userService } from '@unixy/db';
import { verifyToken } from '../utils/jwtUtils';

export const authorize = (roles: string[] = []) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Get the token from the Authorization header
            const authHeader = req.headers.authorization;
        
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Authorization token is required' });
            }
        
            const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
        
            // Verify the token
            const decoded = verifyToken(token);
        
            // Attach the user information to the request for downstream use
            if (decoded) {
                const user = await userService.getUserById(decoded.userId);
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    req.user = { ...userWithoutPassword };

                    // Check if the user's role is authorized
                    if (roles.length && !roles.includes(user.role)) {
                        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
                    }
                } else {
                    return res.status(404).json({ message: 'User not found' });
                }
            } else {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }
        
            next(); // Proceed to the next middleware or controller
        } catch (error) {
            console.error('Token verification failed:', error);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
    };
};
