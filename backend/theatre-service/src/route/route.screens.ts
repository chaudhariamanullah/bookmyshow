import { Router } from "express";
import TheatreScreenController from "../controller/controller.screens.js";

const router = Router({ mergeParams: true });

router.get("/",TheatreScreenController.findAll);
router.post("/",TheatreScreenController.add);
router.get("/:theatre_screen_public_id",TheatreScreenController.findOne);
router.patch("/:theatre_screen_public_id",TheatreScreenController.edit);
router.delete("/:theatre_screen_public_id",TheatreScreenController.remove);
export default router;