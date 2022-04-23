import Router from "express";
import UserController from "../controller/user.controller.js";

const router = new Router();
router.get("/userById", UserController.getUserById);
router.post("/addNewUser", UserController.addNewUser);

export default router;
