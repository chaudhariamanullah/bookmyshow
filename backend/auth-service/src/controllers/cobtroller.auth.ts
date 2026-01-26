import type{ Request, Response } from "express";
import { LocalSignupSchema } from "../schema/schema.localSignup.js";
import { LocalLoginSchema } from "../schema/schema.localLogin.js";
import authService from "../services/service.auth.js";

const authController = {
    async localSignup(req:Request,res:Response){
        try{
            const user = LocalSignupSchema.parse(req.body);
            const sent = await authService.localSignup(user);
            
            if(sent)
                res.status(200).json({message:"Data Sent To User Service"});
            else
                res.status(400).json({message:"Data Couldn't Reach User Service"});
        } catch(err){
            res.status(500).json({error:err});
        }
    },

    async localLogin(req:Request,res:Response){
        try{

            const user = LocalLoginSchema.parse(req.body);
            const sent = await authService.localLogin(user);

             if(sent)
                res.status(200).json({message:"Data Sent To User Service"});
            else
                res.status(400).json({message:"Data Couldn't Reach User Service"});

        } catch(err){   
            res.status(500).json({error:err});
        }
    }
} 

export default authController;