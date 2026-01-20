import pool from "../config/db.js";
import type { AddBooking } from "../types/type.addBooking.js";
import type { ResultSetHeader } from "mysql2/promise";

const bookingModel = {

    async booking(bookingData:AddBooking){
        const sql = `INSERT INTO bookings(
                    booking_public_id,seat_public_id,
                    showtime_public_id,booking_expiry_at)
                    VALUES(?,?,?,?,NOW()+ INTERVAL 5 MINUTE)`;

        const result =  await pool.execute<ResultSetHeader>(sql,[
            bookingData.booking_public_id,
            bookingData.seat_public_id,
            bookingData.showtime_public_id
        ]);

        return result ?? null;
    },

    async confirmBookingStatus(booking_public_id:string){
        const sql = `UPDATE bookings
                    SET booking_status = 'completed'
                    AND booking_expiry_at IS NULL
                    WHERE 
                    booking_status = 'pending'
                    AND booking_expiry_at >= NOW()
                    AND booking_public_id = ?`;
                
        const result = await pool.execute<ResultSetHeader>(sql,[booking_public_id]);
        return result ?? null;
    },

    async cancelBookingStatus(booking_public_id:string){
        const sql = `UPDATE bookings
                    SET booking_status = 'cancelled',
                    booking_expiry_at = NULL
                    WHERE
                    booking_public_id = ?
                    AND booking_status = 'pending'`;

        const result = await pool.execute<ResultSetHeader>(sql,[booking_public_id]);
        return result ?? null;
    },

    async failedBookingStatus(){
        const sql = `UPDATE bookings
                    SET booking_status = 'failed',
                    booking_expiry_at = NULL
                    WHERE 
                    booking_expiry_at < NOW()
                    AND booking_status = 'pending'`;

        const result = await pool.execute<ResultSetHeader>(sql);
        return result ?? null;
    }

}

export default bookingModel;