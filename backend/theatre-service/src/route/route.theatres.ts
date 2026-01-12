import { Router } from "express";
import TheatreController from "../controller/controller.theatres.js";

const router = Router();

router.get("/:theatre_public_id", TheatreController.findOne);
router.get("/", TheatreController.findAll);
router.post("/", TheatreController.add);
router.patch("/:theatre_public_id", TheatreController.edit);
router.delete("/:router_public_id", TheatreController.remove);

export default router;
