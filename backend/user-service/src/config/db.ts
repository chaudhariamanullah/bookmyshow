import mysql from "mysql2/promise";
import type { Pool } from "mysql2/promise";

const pool:Pool = mysql.createPool({
    host: "localhost",
    user: "user_app",
    password: "9825690996",
    database: "users_service"
})

export default pool;