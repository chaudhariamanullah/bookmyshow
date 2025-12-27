import { Router } from "express"
import { getMoviesController, createMovieController, getMovieController, editMovieController } from "../controllers/controller.js"

const router = Router()

router.get("/", getMoviesController)

router.post("/", createMovieController);

router.get("/:movie_public_id", getMovieController);

router.patch("/:movie_public_id", editMovieController);

export default router
