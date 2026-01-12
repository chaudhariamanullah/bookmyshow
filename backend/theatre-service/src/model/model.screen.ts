import pool from "../config/db.js";
import type { AddScreen } from "../types/screens/addScreen.type.js";
import type { editTheatreScreenInput } from "../schemas/screens/editScreen.schema.js";
import type { RowDataPacket } from "mysql2";

const TheatreScreenModel = {
    async fetchOne(theatre_public_id:string, theatre_screen_public_id:string){
        const sql = `SELECT * FROM theatres_screen WHERE theatre_public_id = ? AND theatre_screen_public_id = ?`;
        const [row] = await pool.execute<RowDataPacket[]>(sql,[theatre_public_id,theatre_screen_public_id]);
        return row[0] ?? null;
    },

    async fetchAll(theatre_public_id:string){
        const sql = `SELECT * FROM theatres_screen WHERE theatre_public_id = ?`;
        const [rows] = await pool.execute(sql,[theatre_public_id]);
        return rows;
    },

    async insert(screenDetails:AddScreen,theatre_public_id:string){
        const sql = `INSERT INTO theatre_screen
                    (scree_public_id, theatre_id, screen_number,screen_type, capacity)
                    SELECT 
                    ?, t.theatre_id, ?, ?, ?
                    FROM theatres t
                    WHERE t.theatre_public_id = ?`;

        return await pool.execute(sql, [
            screenDetails.screen_public_id,
            screenDetails.screen_number,
            screenDetails.screen_type,
            screenDetails.capacity,
            theatre_public_id
        ]);
    },

    async update(screenDetails:editTheatreScreenInput,theatre_public_id:string){
        const keys = Object.keys(screenDetails);
        const fields = keys.map( k=> `${k} = ?`).join(",");
        const values = keys.map(k => (screenDetails as any)[k]);

        const sql =`UPDATE theatre_screen sc
                    JOIN theatres t ON t.theatre_id = sc.theatre_id
                    SET ${fields}
                    WHERE t.theatre_public_id = ?;`

        return await pool.execute(sql,[...values,theatre_public_id]);
    },

    async delete(theatre_public_id:string, theatre_screen_public_id:string){
        const sql = 'DELETE FROM theatres_screen WHERE theatre_public_id = ? AND theatre_screen_public_id = ?';
        return await pool.execute(sql,[theatre_public_id,theatre_screen_public_id])
    }
}

export default TheatreScreenModel;