import UsersService from "../service/service.users.js";
import { ZodError } from "zod";
import type { Request, Response } from "express";
import { AddUserSchema } from "../schemas/addUser.schema.js";
import { EditUserSchema } from "../schemas/editUser.schema.js";

const UserController = {
    async getOne(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const user = await UsersService.getOne(user_public_id);
            return user;
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async getAll(req:Request, res:Response){
        try{
            const users = await UsersService.getAll();
            return users;
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async add(req:Request, res:Response){
        try{
            const user = AddUserSchema.parse(req.body);
            await UsersService.add(user);
            return res.status(201).json({message:"User created"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async edit(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;

            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const user = EditUserSchema.parse(req.body);
            await UsersService.edit(user,user_public_id);
            return res.status(201).json({message:"User created"});
        }catch(err){ 
            return res.status(500).json({error:err});
        }
    },

    async remove(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            await UsersService.remove(user_public_id);
            return res.status(200).json({message:"User Deleted"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async userStatus(req:Request, res:Response){
        try{
             const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const status = await UsersService.userStatus(user_public_id);
            return status;
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async statusActivate(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;

            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }

            const status = await UsersService.userStatus(user_public_id);
            return res.status(200).json(status);
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async statusDeactivate(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;

            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }

            await UsersService.statusActivate(user_public_id);
            return res.status(200).json({message:"Status Activated"});

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async resetPassword(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }

            await UsersService.statusDeactivate(user_public_id);
            return res.status(200).json({message:"Status Deactivated"});

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async setRole(req:Request, res:Response){
        try{
            const user_public_id = req.params.user_public_id;
            if(!user_public_id){
                return res.status(400).json({message:"User Id Not Found"});
            }

            await UsersService.setRole(user_public_id);
            return res.status(200).json({message:"Status Deactivated"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async emailExists(req:Request, res:Response){
        try{
            const email = typeof req.query.email === "string" ? req.query.email : undefined;

            if(!email){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const exists = await UsersService.emailExists(email);
            return res.status(200).json(exists);
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async phoneExists(req:Request, res:Response){
        try{
            const phone = typeof req.query.phone === "string" ? req.query.phone : undefined;
            if(!phone){
                return res.status(400).json({message:"User Id Not Found"});
            }
            const exists = await UsersService.emailExists(phone);
            return res.status(200).json(exists);
        }catch(err){
            return res.status(500).json({error:err});
        }
    },
}

export default UserController;