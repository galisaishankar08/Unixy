"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.createProduct = exports.getProducts = void 0;
const db_1 = require("@unixy/db");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield db_1.catalogService.getAllProducts();
        return res.json(products);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch products' });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.catalogService.createProduct(req.body);
        return res.status(201).json(product);
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Failed to create product' });
    }
});
exports.createProduct = createProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield db_1.catalogService.getProductById(req.params.id);
        if (product) {
            return res.json(product);
        }
        else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to fetch product' });
    }
});
exports.getProduct = getProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield db_1.catalogService.updateProduct(req.params.id, req.body);
        if (updatedProduct) {
            return res.json(updatedProduct);
        }
        else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        return res.status(400).json({ error: 'Failed to update product' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield db_1.catalogService.deleteProduct(req.params.id);
        if (success) {
            return res.sendStatus(204); // No content
        }
        else {
            return res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to delete product' });
    }
});
exports.deleteProduct = deleteProduct;
