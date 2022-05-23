import Router from "express";
import ProductsController from "../controller/products.controller.js";

const router = new Router();
router.get("/getAllProducts", ProductsController.getAllProducts);
router.get("/getChilds", ProductsController.getChilds);

export default router;
