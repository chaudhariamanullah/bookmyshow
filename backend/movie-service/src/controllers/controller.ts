import type { Request, Response } from "express"
import { getAllMovies } from "../services/service.js"

export function getMovies(req: Request, res: Response) {
  res.json(getAllMovies())
}
