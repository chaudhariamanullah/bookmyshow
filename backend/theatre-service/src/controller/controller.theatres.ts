import type { Request, Response } from "express";
import TheatreService from "../service/service.theatres.js";
import { addTheatreSchema } from "../schemas/theaters/inputTheatre.schema.js";
import { editTheatreSchema } from "../schemas/theaters/editTheatre.schema.js";
import { ZodError } from "zod";

const TheatreController = {

    async findOne(req:Request,res:Response){
        try{

            const theatre_public_id = req.params.theatre_public_id;
            if(!theatre_public_id){
                return res.status(400).json({message:"Missing Theatre Id"})
            }

            const theatre = await TheatreService.findOne(theatre_public_id);
            return res.status(200).json(theatre);

        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async findAll(req:Request,res:Response){
        try{
            const theatres = await TheatreService.findAll();
            return res.status(200).json(theatres);
        } catch(err){
            return res.status(500).json({error:err})
        }
    },

    async add(req:Request,res:Response){
        try{
            const theatre = addTheatreSchema.parse(req.body);
            await TheatreService.add(theatre);
            return res.status(201).json({message:"Theatre Added"});
        } catch(err){
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }
            return res.status(500).json({error:err})
        }
    },

    async edit(req:Request,res:Response){
        try{
            const theatre = editTheatreSchema.parse(req.body);
            const theatre_public_id = req.params.theatre_public_id;

            if(!theatre_public_id){
                return res.status(400).json({message:"No Theater Found"})
            }
            await TheatreService.edit(theatre,theatre_public_id);
            return res.status(200).json({message:"Theatre Updated"});
        } catch(err){
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }
            return res.status(500).json({error:err})
        }
    }, 

    async remove(req:Request,res:Response){
        try{
            const theater_public_id = req.params.theater_public_id;

            if(!theater_public_id){
                return res.status(400).json({message:"Theatre Id Is Required"});
            }
            await TheatreService.remove(theater_public_id);
            return res.status(200).json({message:`Theatre ${theater_public_id} Deleted`});
        } catch(err){
             return res.status(500).json({error:err})
        }
    }
}

export default TheatreController;