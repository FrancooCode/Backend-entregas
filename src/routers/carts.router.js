import { Router } from "express";
import { CartManager } from "../CartManager.js";

export const cartsRouter = Router();

const cartManager = new CartManager();

cartsRouter.post('/', (req, res) => {
    try {
        cartManager.createCart();
        res.status(201).json({ message: 'Cart created' })
    } catch (error) {
        res.status(501).json({ error: error.message })
    }
})

cartsRouter.get('/:cid', (req, res) => {
    try {
        const { cid } = req.params;
        const cart = cartManager.getCartById(Number(cid));
        res.status(200).json(cart);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
})

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    try {
        const { cid, pid } = req.params;
        cartManager.addProductToCart(Number(cid), Number(pid));
        res.status(201).json({ message: `Product ${pid }added to cart ${cid}`});
    }
    catch (error) {
        res.status(501).json({ error: error.message });
    }
})