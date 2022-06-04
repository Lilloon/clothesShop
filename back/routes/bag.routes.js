import Router from "express";
import BagController from "../controller/bag.controller.js";

const router = new Router();
router.get("/getBagByBagId", BagController.getBagByBagId);
router.get("/getBagByClientId", BagController.getBagByClientId);
router.post("/createBag", BagController.createBag);
router.post("/addItemToBag", BagController.addItemToBag);
router.delete("/deleteItemFromBag", BagController.deleteItemFromBag);
router.post("/buyItems", BagController.buyItems);

export default router;
