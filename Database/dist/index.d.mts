import * as _prisma_client from '.prisma/client';
import * as _prisma_client_runtime_library from '@prisma/client/runtime/library';
import { PrismaClient } from '@prisma/client';

declare class CatalogService {
    getAllProducts(): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createProduct(data: {
        name: string;
        description?: string;
        price: number;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProductById(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    updateProduct(id: string, data: {
        name?: string;
        description?: string;
        price?: number;
    }): Promise<_prisma_client.Prisma.BatchPayload>;
    deleteProduct(id: string): Promise<boolean>;
}
declare const _default$1: CatalogService;

declare class UserService {
    getUserById(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    } | null>;
    getUserByEmail(email: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    } | null>;
    createUser(email: string, password: string, name?: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    }>;
    getUserByGoogleId(googleId: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    } | null>;
    createUserWithGoogle(email: string, googleId: string, name?: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    }>;
    verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    updatePassword(userId: string, newPassword: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        googleId: string | null;
        password: string | null;
        role: _prisma_client.$Enums.Role;
    }>;
}
declare const _default: UserService;

declare const prisma: PrismaClient<_prisma_client.Prisma.PrismaClientOptions, never, _prisma_client_runtime_library.DefaultArgs>;

export { _default$1 as catalogService, prisma, _default as userService };
