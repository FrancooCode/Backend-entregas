import { Router } from "express";
import  { productManager } from './products.router.js';

export const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    try {
        const productsList = productManager.getProducts();
        res.status(200).render("home", {products: productsList});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
    try {
        const productsList = productManager.getProducts();
        res.status(200).render('realTimeProducts', {products: productsList})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})