import type { Request, Response} from "express";
import { ZodError } from "zod";
import { addScreenSchema } from "../schemas/screens/addScreen.schema.js";
import { editScreenSchema } from "../schemas/screens/editScreen.schema.js";
import TheatreScreenService from "../service/service.screen.js";

const TheatreScreenController = {
    async findOne(req:Request, res:Response){
        try{
            const theatre_screen_public_id = req.params.theatre_screen_public_id;
            const theatre_public_id = req.params.theatre_public_id;

            if ( !theatre_screen_public_id || !theatre_public_id){
                return res.status(400).json({message:"Theatre Or Screen Id Missing"});
            }

            const screen = await TheatreScreenService.findOne(theatre_public_id,theatre_screen_public_id);
            return res.status(200).json(screen);

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async findAll(req:Request, res:Response){
        try{
            const theatre_public_id = req.params.theatre_public_id;

            if (!theatre_public_id){
                return res.status(400).json({message:"Theatre Or Screen Id Missing"});
            }

            const screens = await TheatreScreenService.findAll(theatre_public_id);
            return res.status(200).json(screens);

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async add(req:Request, res:Response){
        try{
            const screen = addScreenSchema.parse(req.body);
            const theatre_public_id = req.params.theatre_public_id;

            if (!theatre_public_id){
                return res.status(400).json({message:"Theatre Id Not Found"});
            }
            await TheatreScreenService.add(screen,theatre_public_id);

            return res.status(201).json({message:"Theatre Screen Added"});
        }catch(err){
            if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }

            return res.status(500).json({error:err});
        }
    },

    async edit(req:Request, res:Response){
        try{
            const screenValues = editScreenSchema.parse(req.body);
            const theatre_public_id = req.params.theatre_public_id;

            if(!theatre_public_id){
                return res.status(400).json({message:"No Theatre Id Found"});
            }

            await TheatreScreenService.edit(screenValues,theatre_public_id);
            return res.status(201).json({message:"Theatre Screen Edited"});
            
        }catch(err){
             if ( err instanceof ZodError){
                return res.status(400).json({error:err});
            }

            return res.status(500).json({error:err});
        }
    },

    async remove(req:Request, res:Response){
        try{
            const theatre_screen_public_id = req.params.theatre_screen_public_id;
            const theatre_public_id = req.params.theatre_public_id;

            if ( !theatre_screen_public_id || !theatre_public_id){
                return res.status(400).json({message:"Theatre Or Screen Id Missing"});
            }

            await TheatreScreenService.remove(theatre_public_id,theatre_screen_public_id);
            return res.status(200).json({message:`${theatre_screen_public_id} Deleted`});
        }catch(err){
            return res.status(500).json({error:err});
        }
    }
}

export default TheatreScreenController;