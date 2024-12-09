import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CatalogService {
    async getAllProducts() {
        return await prisma.product.findMany();
    }

    async createProduct(data: { name: string; description?: string; price: number }) {
        return await prisma.product.create({
            data
        });
    }

    async getProductById(id: string) {
        // Use string for UUID
        return await prisma.product.findUnique({
            where: { id }
        });
    }

    async updateProduct(id: string, data: { name?: string; description?: string; price?: number }) {
        return await prisma.product.updateMany({
            where: { id },
            data
        });
    }

    async deleteProduct(id: string) {
        const deletedProduct = await prisma.product.deleteMany({
            where: { id }
        });
        return deletedProduct.count > 0; // Return true if a product was deleted
    }
}

export default new CatalogService();
