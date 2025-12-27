import type { Request, Response } from "express"
import { getAllMovies, createMovie , getMovie, editMovie} from "../services/service.js"
import { createMovieSchema } from '../schemas/movie/baseMovie.schema.js';
import { updateMovieSchema } from '../schemas/movie/updateMovie.schema.js';


export async function getMoviesController(req: Request, res: Response) {
    const movies = await getAllMovies();
    res.json(movies);
}

export async function createMovieController(req: Request, res: Response) {
    try{
        const data = createMovieSchema.parse(req.body);
        const movie = {
            title: data.title,
            poster_url: data.poster_url,
            released_at: new Date(data.released_at)
        }
        await createMovie(movie);
        res.status(201).json({ message: "Movie created" })
    } catch(err){
        res.status(400).json({error:err});
    }
    
}

export async function getMovieController(req: Request, res: Response){
    try{
        const movie_public_id = req.params.movie_public_id;

        if(!movie_public_id){
            return res.status(400).json({error:"Movie Id Is Required!"})
        }
        const movie = await getMovie(movie_public_id);

        if(!movie){
            res.status(400).json({error:`No Movie With ID ${movie_public_id}`});
        } else {
            res.status(201).json(movie)
        }
            
    } catch(err){
        res.status(400).json({error:err});
    }

}

export async function editMovieController(req:Request, res:Response){
    try{
        const movie_public_id = req.params.movie_public_id;
        if(!movie_public_id){
            return res.status(400).json({error:"Movie ID Is Required!"})
        }
        const data = updateMovieSchema.parse(req.body);
        await editMovie(movie_public_id,data);
        res.status(200).json({success:"Movie Updated Succesfully"});
    } catch(err){
        res.status(400).json({error:err});
    }
}