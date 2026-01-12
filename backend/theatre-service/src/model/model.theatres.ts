import pool from "../config/db.js";
import type { AddTheatreInput } from "../types/theatres/addTheatre.type.js";
import type { EditTheatreInput } from "../types/theatres/editTheatre.type.js";
import type { RowDataPacket } from "mysql2";

const TheatreModel = {

    async fetchOne(theatre_public_id:string){
        const sql = "SELECT * FROM theatres WHERE theatre_public_id = ?";
        const [row] = await pool.execute<RowDataPacket[]>(sql,[theatre_public_id]);
        return row ?? null;
    },

    async fetchAll(){
        const sql = "SELECT * FROM theatres";
        const [rows] = await pool.execute(sql);
        return rows;
    },

    async insert(theatreDetails:AddTheatreInput){
        const sql = `INSERT INTO 
                     theatres(theatre_public_id, theatre_name, theatre_image, theatre_country, theatre_city, theatre_address, theatre_status)
                     VALUES(?,?,?,?,?,?,?)`;    

        return await pool.execute(sql,[
            theatreDetails.theatre_public_id,
            theatreDetails.theatre_name,
            theatreDetails.theatre_image,
            theatreDetails.theatre_country,
            theatreDetails.theatre_city,
            theatreDetails.theatre_address,
            theatreDetails.theatre_status
        ]);
    },

    async update(theatre:EditTheatreInput,theatre_public_id:string){
        const keys = Object.keys(theatre);

        const fields = keys.map(k =>`${k} = ?`).join(",");
        const values = keys.map(k => (theatre as any)[k]);

        const sql = `UPDATE theatres set ${fields} WHERE theatre_public_id = ?`;
        return await pool.execute(sql,[...values,theatre_public_id]);

    },

    async deleteTheatre(theatre_public_id:string){
        const sql = "DELETE FROM theatres WHERE theatre_public_id = ?";
        return await pool.execute(sql,[theatre_public_id]);
    }
}

export default TheatreModel;