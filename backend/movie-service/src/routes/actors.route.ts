import { Router } from "express";
import  actorController  from "../controllers/actors.controller.js"

const router = Router();

router.get("/:actor_public_id", actorController.find);
router.post("/", actorController.create);
router.patch("/:actor_public_id", actorController.edit);
router.delete("/:actor_public_id", actorController.remove);

export default router