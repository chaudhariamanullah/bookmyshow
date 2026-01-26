import pool from "../config/db.js";
import type { RowDataPacket } from "mysql2";
import type { AddUser } from "../types/addUser.type.js";
import type { EditUserInput } from "../schemas/editUser.schema.js";

const UsersModel = {

    async fetchOne(user_public_id:string){
        const sql = `SELECT 
                     user_fname, user_lname, user_email, user_phone, auth_app, user_role, user_status
                     FROM users WHERE user_public_id = ?`;
        const [rows] = await pool.execute< RowDataPacket[] >(sql,[user_public_id]);
        return rows ?? null;
    },

    async fetchAll(){
         const sql = `SELECT 
                     user_fname, user_lname, user_email, user_phone, auth_app, user_role, user_status
                     FROM users`;
        const [rows] = await pool.execute(sql);
        return rows ?? null;
    },

    async add(userDetails:AddUser){
        const sql = `INSERT INTO 
                     users(user_public_id, user_fname, user_lname, user_email, user_country, user_phone, user_password, auth_app, user_role, user_status)
                     VALUES(?,?,?,?,?,?,?,?,?,?)`;
        return await pool.execute(sql,[
            userDetails.user_public_id,
            userDetails.user_fname,
            userDetails.user_lname,
            userDetails.user_email,
            userDetails.user_country_code,
            userDetails.user_phone,
            userDetails.user_password,
            userDetails.auth_app,
            userDetails.user_role,
            userDetails.user_status
        ]);
    },

    async update(userDetails:EditUserInput, user_public_id:string){
        const keys = Object.keys(userDetails);
        const fields = keys.map( k => `${k} = ?`).join(",");
        const values = keys.map( k => (userDetails as any) [k]);

        const sql = `UPDATE 
                     users
                     SET ${fields}
                     WHERE user_public_id = ?`;
        
        return pool.execute(sql,[...values,user_public_id]);
    },

    async delete(user_public_id:string){
        const sql = `DELETE 
                     FROM users
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async fetchStatus(user_public_id:string){
        const sql = `SELECT 
                     user_status 
                     FROM users 
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async updateActiveStatus(user_public_id:string){
        const sql = `UPDATE 
                     users 
                     SET user_status = 'inactive' 
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async updateInactiveStatus(user_public_id:string){
        const sql = `UPDATE 
                     users 
                     SET user_status = 'active' 
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async resetPassword(user_public_id:string){
        const sql = `UPDATE 
                     users 
                     SET user_password = ? 
                     WHERE user_public_id = ?`;

        return await pool.execute(sql,[user_public_id]);
    },

    async updateUserRole(user_public_id:string){
        const sql = `UPDATE 
                     users 
                     SET user_role = ? 
                     WHERE user_public_id = ?`

        return await pool.execute(sql,[user_public_id]);
    },

    async checkMailExists(email:string){
        const sql = `SELECT 
                    user_email 
                    FROM users 
                    WHERE user_email = ?`;

        return await pool.execute(sql,[email]);
    },

    async checkPhoneExists(phone:string){
        const sql = `SELECT 
                    user_phone 
                    FROM users 
                    WHERE user_phone = ?`;
        return await pool.execute(sql,[phone]);
    }
}

export default UsersModel;
