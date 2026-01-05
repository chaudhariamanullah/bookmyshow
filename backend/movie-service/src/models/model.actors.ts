import pool from "../config/db.js";
import type { RowDataPacket } from "mysql2";
import type { Actor, ActorUpdate } from "../types/actors.js";

const actorModel = {
    async find(actor_public_id:string){
        const sql = "SELECT actor_name, actor_dob, actor_country, actor_city, actor_spouse FROM actors where actor_public_id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(sql,[actor_public_id]);
        return rows[0] ?? null;
    },
    async create(actorData:Actor){
        const sql = "INSERT INTO actors(actor_public_id, actor_name, actor_dob, actor_country, actor_city, actor_spouse) VALUES(?,?,?,?,?,?)";
        return await pool.execute(
            sql,[
                actorData.actor_public_id,
                actorData.actor_name,
                actorData.actor_dob,
                actorData.actor_country,
                actorData.actor_city,
                actorData.actor_spouse]);
    },
    async update(actorData:ActorUpdate, actor_public_id:string){
        const keys = Object.keys(actorData);
        const fields = keys.map(k => `${k} = ?`).join(", ");
        const values = keys.map(k => (actorData as any)[k]);

        const sql = `UPDATE actors SET ${fields} WHERE actor_public_id = ?`;
        return await pool.execute(sql,[...values,actor_public_id])
    },
    async delete(actor_public_id:string){
        const sql = "DELETE FROM actors WHERE actor_public_id = ?";
        return await pool.execute(sql,[actor_public_id]);
    }
}

export default actorModel;