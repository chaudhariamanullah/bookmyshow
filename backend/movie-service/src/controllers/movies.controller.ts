import type { Request, Response } from "express"
import MovieService from "../services/movies.service.js";
import { createMovieSchema } from '../schemas/movie/baseMovie.schema.js';
import { updateMovieSchema } from '../schemas/movie/updateMovie.schema.js';
import { addLanguageSchema } from "../schemas/movie/movieLanguage.schema.js";
import { addCastSchema } from "../schemas/movie/MovieCast.schema.js";
import { ZodError } from "zod";

const MovieController = {
    
    async findAll(req: Request, res: Response) {
        try{
            const movies = await MovieService.findAll();
            return res.status(200).json(movies);
        } catch(err){
            return res.status(500).json({error:err});
        }    
    },

    async  create(req: Request, res: Response) {
        try{
            const data = createMovieSchema.parse(req.body);
            const movie = {
                title: data.title,
                poster_url: data.poster_url,
                released_at: new Date(data.released_at)
            }
            await MovieService.create(movie);
            res.status(201).json({ message: "Movie created" })
            } catch(err){
                res.status(500).json({error:err});
        }
    },

     async findOne(req: Request, res: Response){
        try{
            const movie_public_id = req.params.movie_public_id;

            if(!movie_public_id){
                return res.status(400).json({error:"Movie Id Is Required!"})
            }
            const movie = await MovieService.findOne(movie_public_id);

            if(!movie){
                res.status(400).json({error:`No Movie With ID ${movie_public_id}`});
            } else {
                res.status(201).json(movie)
            }
                
            }catch(err){
                res.status(500).json({error:err});
        }
     },

     async edit(req:Request, res:Response){
     try{
        const movie_public_id = req.params.movie_public_id;
        if(!movie_public_id){
            return res.status(400).json({error:"Movie ID Is Required!"})
        }
        const data = updateMovieSchema.parse(req.body);
        await MovieService.edit(movie_public_id,data);
        res.status(200).json({success:"Movie Updated Succesfully"});
        } catch(err){
            res.status(500).json({error:err});
        }
     },
        
    async remove(req:Request, res:Response){
        try{
            const movie_public_id = req.params.movie_public_id;
            if(!movie_public_id){
                return res.status(400).json({message:"Movie Id Is Required"});
            }
            await MovieService.remove(movie_public_id);
            res.status(200).json({message:`Movie ${movie_public_id} Is Removed Succesfully`});
            } catch(err){
                res.status(500).json({error:err});
        }
    },

    async getlanguages(req:Request, res:Response){
        try{
            const movie_public_id = req.params.movie_public_id;

            if(!movie_public_id){
                return res.status(400).json({message:"Movie Id Not Found"});
            }
            const languages = await MovieService.getLanguages(movie_public_id);
            return res.status(200).json(languages);
        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async addLanguages(req:Request, res:Response){
        try{
            const languages =  addLanguageSchema.parse(req.body);
            const movie_public_id = req.params.movie_public_id;

            if (!movie_public_id){
                return res.status(400).json({message:"Movie Id Is Required"});
            }
            await MovieService.addLanguages(movie_public_id,languages);
            res.status(201).json({message:"Languages Added"});
        }catch(err){

            if( err instanceof ZodError){
                return res.status(500).json({error:"Error In Json Schema"});
            }
            return res.status(500).json({error:err});
        }
    },

    async removeLanguage(req:Request, res:Response){
        try{
            const language_id = req.params.language_id;
            const movie_public_id = req.params.movie_public_id;

            if (!language_id || !movie_public_id){
                return res.status(400).json({message:"Both Language And Movie Id Is Required"});
            }

            await MovieService.removeLanguage(language_id,movie_public_id);
            return res.status(500).json({message:`${language_id} Is Deleted From ${movie_public_id}`});

        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async findCast(req:Request, res:Response){
        try{
            const movie_public_id = req.params.movie_public_id;
            if(!movie_public_id){
                return res.status(400).json({message:"Movie Id Not Found"});
            }

            const cast = await MovieService.findCast(movie_public_id);
            return res.status(200).json(cast);

        } catch( err ){
            return res.status(500).json({error:err});
        }
    },

    async addCast(req:Request, res:Response){
        try{
            const castList = addCastSchema.parse(req.body);
            const movie_public_id = req.params.movie_public_id;
            if(!movie_public_id){
                return res.status(400).json({message:"Movie Id Not Found"});
            }

            await MovieService.addCast(movie_public_id,castList);
            return res.status(201).json({message:"Cast Added Successfully"});

        } catch( err ){

            if ( err instanceof ZodError){
                return res.status(500).json({message:"Error In Json Schema", error:err})
            }
            return res.status(500).json({error:err});
        }
    },

    async removeCast(req:Request, res:Response){
        try{
            const movie_public_id = req.params.movie_public_id;
            const cast_public_id = req.params.cast_public_id;

            console.log(cast_public_id,movie_public_id);
            if ( !movie_public_id || !cast_public_id){
                return res.status(400).json({message:"Cast Id Or Movie Id Is Missing"});
            }

            await MovieService.removeCast(movie_public_id,cast_public_id);
            return res.status(200).json({message:`Cast With Id ${cast_public_id} Is Removed`});

        } catch( err ){
            return res.status(500).json({error:err});
        }

    }
}

export default MovieController;