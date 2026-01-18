import type { Request, Response } from "express"
import { AddShowTimeSchema } from "../schemas/schema.addShowTime.js";
import { EditShowTimeSchema } from "../schemas/schema.editShowTime.js"
import showTimeService from "../services/service.showTime.js";
import { filterQuerySchema } from "../schemas/schema.filterQuery.js";
import { ValidateShowtimeSchema } from "../schemas/schema.validateShowtime.js";

const showTimeController = {

    async filterShow(req:Request,res:Response){
        try{
            const filters = filterQuerySchema.parse(req.query);
            const shows = await showTimeService.filterShow(filters);
            return res.status(200).json(shows);
        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async add(req:Request,res:Response){
        try{

            const showTime = AddShowTimeSchema.parse(req.body);
            await showTimeService.add(showTime);
            return res.status(201).json({message:"ShowTime Added"});
        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async edit(req:Request,res:Response){
        try{

            const showTime = EditShowTimeSchema.parse(req.body);
            const showTime_public_id = req.params.showTime_public_id as string;

            if(!showTime_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            await showTimeService.edit(showTime,showTime_public_id);
            return res.status(201).json({message:"ShowTime Updated"});
        } catch(err){

            return res.status(500).json({error:err});
        }
    },

    async housefull(req:Request,res:Response){
        try{
            const showTime_public_id = req.params.showTime_public_id as string;

            if(!showTime_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            await showTimeService.housefull(showTime_public_id);
            return res.status(200).json({message:"Show Time Status Changed To Housefull"})

        }catch(err){

            return res.status(500).json({error:err});
        }
    },

     async cancel(req:Request,res:Response){
        try{

            const showTime_public_id = req.params.showTime_public_id as string;

            if(!showTime_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            await showTimeService.cancel(showTime_public_id);
            return res.status(200).json({message:"Show Time Status Changed To Cancel"})

        }catch(err){

            return res.status(500).json({error:err});
        }
    },

    async getShowtime(req:Request,res:Response){
        try{
            const showTime_public_id = req.params.showTime_public_id as string;

            if(!showTime_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            const showTime = await showTimeService.getShowTime(showTime_public_id);
            return res.status(200).json(showTime);

        } catch(err){
            return res.status(500).json({error:err});
        }
    },

    async available(req:Request,res:Response){
        try{
            const showTime_public_id = req.params.showTime_public_id as string;

            if(!showTime_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            const showTime = await showTimeService.available(showTime_public_id);
            return res.status(200).json(showTime);

        } catch( err ){
            return res.status(500).json({error:err});
        }
    },

    async validate(req:Request,res:Response){
         try{
            const values = ValidateShowtimeSchema.parse(req.body);
            const showTime = await showTimeService.validate(values);
            return res.status(200).json(showTime);
        } catch( err ){
            return res.status(500).json({error:err});
        }
    },

    async getShowTimeAtScreen(req:Request,res:Response){
        try{
            const screen_public_id = req.params.screen_public_id as string;

            if(!screen_public_id){
                return res.status(400).json({message:"Showtime Public Id Not Found"})
            }

            const showTime = await showTimeService.available(screen_public_id);
            return res.status(200).json(showTime);
        } catch(err) {
            return res.status(500).json({error:err});
        }
    }

    
}

export default showTimeController;