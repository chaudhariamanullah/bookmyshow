import { Router } from "express"
import MovieController from "../controllers/movies.controller.js";

const router = Router();

router.get("/", MovieController.findAll)
router.post("/", MovieController.create);
router.get("/:movie_public_id", MovieController.findOne);
router.patch("/:movie_public_id", MovieController.edit);
router.delete("/:movie_public_id", MovieController.remove);

router.get("/:movie_public_id/languages", MovieController.getlanguages);
router.post("/:movie_public_id/languages", MovieController.addLanguages);
router.delete("/:movie_public_id/languages/:language_id",MovieController.removeLanguage);

router.get("/:movie_public_id/casts",MovieController.findCast);
router.post("/:movie_public_id/casts",MovieController.addCast);
router.delete("/:movie_public_id/casts/:cast_public_id",MovieController.removeCast);

export default router;
