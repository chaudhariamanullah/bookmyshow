import pool from "../config/db.js";
import type { EditShowTimeInput } from "../schemas/schema.editShowTime.js";
import type { AddShowTime } from "../types/type.addShowtime.js";
import type { RowDataPacket } from "mysql2/promise";
import type { filterQueryInput } from "../schemas/schema.filterQuery.js";

const showTimeModel = {

    async filterShowtime(filters:filterQueryInput){
        const keys = Object.keys(filters);
        const fields = keys.map( k => `${k} = ?`).join(",");
        const values = keys.map( k => (filters as any)[k]);

        const sql = `SELECT * FROM showtime WHERE ${fields}`;
        const shows = await pool.execute(sql,[...values]);
        return shows ?? null;
    },
    
    async insert(showTime:AddShowTime){
        const sql = `INSERT INTO 
                    showtime(showtime_public_id, movie_id, theater_id, screen_id, date, time, showtime_status)
                    VALUES(?,?,?,?,?,?,?)`;
        return await pool.execute(sql,[
            showTime.showTime_public_id,
            showTime.movie_id,
            showTime.theater_id,
            showTime.screen_id,
            showTime.date,
            showTime.time,
            showTime.showtime_status
        ])
    },

    async update(showtime:EditShowTimeInput,showTime_public_id:string){
        const keys = Object.keys(showtime);
        const fields = keys.map( k => `${k} = ?`).join(",");
        const values = keys.map(k => (showtime as any)[k]);

        const sql = `UPDATE showtime SET ${fields} WHERE showtime_public_id = ?`;
        return await pool.execute(sql,[...values]);
    },

    async housefull(showTime_public_id:string){
        const sql = "UPDATE showtime SET showtime_status = 'housefull' WHERE showtime_public_id = ?";
        return await pool.execute(sql,[showTime_public_id]);
    },

    async cancel(showTime_public_id:string){
        const sql = "UPDATE showtime SET showtime_status = 'cancel' WHERE showtime_public_id = ?";
        return await pool.execute(sql,[showTime_public_id]);
    },

    async fetchShowTime(showTime_public_id:string){
        const sql = "SELECT * FROM showtime WHERE showtime_public_id = ?";
        const [shows] = await pool.execute< [RowDataPacket] >(sql,[showTime_public_id]);
        return shows ?? null;
    },

    async available(showTime_public_id:string){
        const sql = "UPDATE showtime SET showtime_status = 'housefull' WHERE showtime_public_id = ?";
        return await pool.execute(sql,[showTime_public_id]);
    },

    async validate(date:string,time:string,screen_public_id:string){
        const sql = `SELECT count(showtime_public_id) 
                    FROM showtime 
                    WHERE 
                    date = ? AND time = ? 
                    AND screen_id = ?
                    AND showtime_status NOT = 'cancel' `;

        const [showtime_public_ids] = await pool.execute< [RowDataPacket] >(sql,[date,time,screen_public_id]);
        return showtime_public_ids ?? null;
    },

    async fetchShowTimeAtScreen(showTime_public_id:string){
        const sql = "UPDATE showtime SET showtime_status = 'housefull' WHERE showtime_public_id = ?";
        const [shows] = await pool.execute< [RowDataPacket] >(sql,[showTime_public_id]);
        return shows ?? null;
    }
};

export default showTimeModel;