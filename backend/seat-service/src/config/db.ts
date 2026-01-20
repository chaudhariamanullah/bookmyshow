import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const pool:Pool = mysql.createPool({
    host:"localhost",
    database:"seat_service",
    password:"9825690996",
    user:"seat_app"
});

export default pool;