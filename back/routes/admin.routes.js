import Router from "express";
import AdminController from "../controller/admin.controller.js";

const router = new Router();
router.get("/getCategories", AdminController.getCategories);
router.put("/updateOrderStatus", AdminController.updateOrderStatus);

export default router;
