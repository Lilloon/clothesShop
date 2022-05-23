import Router from "express";
import BagController from "../controller/bag.controller.js";

const router = new Router();
router.get("/getBagByBagId", BagController.getBagByBagId);
router.get("/getBagByClientId", BagController.getBagByClientId);
router.post("/createBag", BagController.createBag);

export default router;
