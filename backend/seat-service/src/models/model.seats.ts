import pool from "../config/db.js";
import type { RowDataPacket } from "mysql2/promise";
import type { AddSeats } from "../types/type.addSeats.js";
import type { ResultSetHeader } from "mysql2/promise";

const seatModel = {
    async fetchSeats(screen_public_id:string){
        const sql = `SELECT
                    seat_public_id, seat_status
                    FROM seats
                    WHERE screen_public_id = ?`;

        const seats = await pool.execute(sql,[screen_public_id]);
        return seats ?? null;
    },

    async fetchAvailableSeats(screen_public_id:string){
        const sql = `SELECT
                    seat_public_id
                    FROM seats
                    WHERE screen_public_id = ?
                    AND seat_status = 'available'`;

        const seats = await pool.execute(sql,[screen_public_id]);
        return seats ?? null;
    },

    async fetchSeatCount(screen_public_id:string){
        const sql = `SELECT
                     COUNT(seat_id)
                    FROM seats
                    WHERE seat_public_id = ?`;
            
        const [seatCount] = await pool.execute<[RowDataPacket]>(sql,[screen_public_id]);
        return seatCount ?? null
    },

    async insertSeats(seats:AddSeats){
        const sql = `INSERT INTO seats (seat_public_id, screen_public_id)
                     VALUES ?`;

        const values = seats.seat_public_id.map(seatId => [
                       seatId,
                       seats.screen_public_id ]);

        return await pool.execute(sql, [values]);
    },

    async deleteSeat(seat_public_id:string){
        const sql = "DELETE FROM seats WHERE seat_public_id = ? AND seat_status != 'booked' ";
        const [result] = await pool.execute<ResultSetHeader>(sql,[seat_public_id]);
        if ( result.affectedRows === 1)
            return true
        else
            return false
    },

    async bookSeat(seat_public_id:string){
        const sql = `UPDATE seats 
                     SET seat_status = 'booked', hold_expires_at = NULL
                     WHERE 
                     seat_public_id = ? AND seat_status = 'hold' 
                     AND hold_expires_at > NOW()`;
        const [result] = await pool.execute<ResultSetHeader>(sql,[seat_public_id]);
        if ( result.affectedRows === 1)
            return true
        else
            return false
    },

    async cancelSeat(seat_public_id:string){
        const sql = `UPDATE seats 
                     SET seat_status = 'available', hold_expires_at = NULL
                     WHERE 
                     seat_public_id = ? AND seat_status = 'booked' `;
        const [result] = await pool.execute<ResultSetHeader>(sql,[seat_public_id]);
        if ( result.affectedRows === 1)
            return true
        else
            return false
    },

    async holdSeat(seat_public_id:string){
        const sql = `UPDATE seats 
                     SET seat_status = 'hold', hold_expires_at = NOW() + INTERVAL 5 MINUTE
                     WHERE seat_public_id = ?
                     AND seat_status = 'available' AND is_active = 1`;
        const [result] = await pool.execute<ResultSetHeader>(sql,[seat_public_id]);
        if ( result.affectedRows === 1)
            return true
        else
            return false
    },

    async freeSeats(){
        const sql = `UPDATE seats
                    SET seat_status = 'available',
                    hold_expires_at = NULL
                    WHERE hold_expires_at <= NOW()
                    AND hold_expires_at IS NOT NULL
                    AND seat_status = 'hold' `;
        
        const [result] = await pool.execute<ResultSetHeader>(sql);
        if ( result.affectedRows >= 1)
            return true
        else
            return false
    }
}

export default seatModel;