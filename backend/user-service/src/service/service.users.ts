import UsersModel from "../model/model.users.js";
import type { AddUserInput } from "../schemas/addUser.schema.js";
import type { EditUserInput } from "../schemas/editUser.schema.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

const UsersService = {
    async getOne(user_public_id:string){
        return await UsersModel.fetchOne(user_public_id);
    },

    async getAll(){
        return await UsersModel.fetchAll();
    },

    async add(user:AddUserInput){
        const user_public_id = uuidv4();
        const hash = await bcrypt.hash(user.user_password, 10);
        return await UsersModel.add({
            ...user,
            user_public_id,
            user_password : hash
        });
    },

    async edit(user:EditUserInput,user_public_id:string){
        return await UsersModel.update(user,user_public_id);
    },

    async remove(user_public_id:string){
        return await UsersModel.delete(user_public_id);
    },

    async userStatus(user_public_id:string){
        return await UsersModel.fetchStatus(user_public_id)
    },

    async statusActivate(user_public_id:string){
        return await UsersModel.updateActiveStatus(user_public_id)
    },

    async statusDeactivate(user_public_id:string){
        return await UsersModel.updateInactiveStatus(user_public_id)
    },

    async resetPassword(user_public_id:string){
        return await UsersModel.resetPassword(user_public_id)
    },

    async setRole(user_public_id:string){
        return await UsersModel.updateUserRole(user_public_id)
    },

    async emailExists(email:string){
        return await UsersModel.checkMailExists(email);
    },

    async phoneExists(phone:string){
        return await UsersModel.checkPhoneExists(phone);
    },
}

export default UsersService;