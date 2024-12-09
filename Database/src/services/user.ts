import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

class UserService {
    // Get user by user ID
    async getUserById(id: string) {
        return prisma.user.findUnique({ where: { id } });
    }

    // Get user by email
    async getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
    }

    // Create a user with an encrypted password
    async createUser(email: string, password: string, name?: string) {
        // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return prisma.user.create({
            data: { email, password, name }
        });
    }

    // Get user by Google ID
    async getUserByGoogleId(googleId: string) {
        return prisma.user.findUnique({ where: { googleId } });
    }

    // Create a user with Google authentication
    async createUserWithGoogle(email: string, googleId: string, name?: string) {
        const hashedPassword = await bcrypt.hash(googleId, SALT_ROUNDS); // Hash googleId as a placeholder
        return prisma.user.create({
            data: { email, googleId, password: hashedPassword, name }
        });
    }

    // Verify password during login
    async verifyPassword(plainPassword: string, hashedPassword: string) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    // Update user password
    async updatePassword(userId: string, newPassword: string) {
        // const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
        return prisma.user.update({
            where: { id: userId },
            data: { password: newPassword }
        });
    }
}

export default new UserService();
