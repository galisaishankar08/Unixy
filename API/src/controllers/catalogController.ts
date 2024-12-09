import { Request, Response } from 'express';
import { catalogService } from '@unixy/db';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await catalogService.getAllProducts();
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await catalogService.createProduct(req.body);
        return res.status(201).json(product);
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Failed to create product' });
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await catalogService.getProductById(req.params.id);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
}

export const updateProduct = async(req: Request, res: Response) => {
    try {
        const updatedProduct = await catalogService.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            return res.json(updatedProduct);
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Failed to update product' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const success = await catalogService.deleteProduct(req.params.id);
        if (success) {
            return res.sendStatus(204); // No content
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete product' });
    }
}
