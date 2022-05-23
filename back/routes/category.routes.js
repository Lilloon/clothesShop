import Router from "express";
import CategoryController from "../controller/category.controller.js";

const router = new Router();
router.get("/category", CategoryController.getCategoryPage);
router.post("/addItem", CategoryController.addItem);
router.get("/getData", CategoryController.getData);
export default router;
