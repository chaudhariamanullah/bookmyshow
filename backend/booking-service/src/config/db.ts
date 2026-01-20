import type { Pool } from "mysql2/promise";
import mysql from "mysql2/promise";

const pool:Pool = mysql.createPool({
    host:"localhost",
    database:"booking_service",
    user:"booking_user",
    password:"9825690996"
});

export default pool;