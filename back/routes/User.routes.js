import Router from "express";
import UserController from "../controller/user.controller.js";

const router = new Router();
router.get("/userById", UserController.getUserById);
router.post("/addNewUser", UserController.addNewUser);
router.get("/login", UserController.login);
router.get("/getOrders", UserController.getOrders);
router.get("/getOrderDetails", UserController.getOrderDetails);

export default router;
