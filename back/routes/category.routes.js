import Router from "express";
import CategoryController from "../controller/category.controller.js";

const router = new Router();
router.get("/category", CategoryController.getCategoryPage);

export default router;
