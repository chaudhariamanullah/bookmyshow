import pool from "../config/db.js";
import type { Movie } from '../types/movies.js';
import type { RowDataPacket } from "mysql2";
import type { updateMovieInput } from '../schemas/movie/updateMovie.schema.js';

export async function insertMovie(movieData:Omit<Movie,"created_at"|"updated_at">){
    const sql = "INSERT INTO movies(movie_public_id,title,poster_url,released_at) VALUES(?,?,?,?)";
     await pool.execute(sql, [
        movieData.movie_public_id,
        movieData.title,
        movieData.poster_url,
        movieData.released_at,
    ])

}

export async function findAllMovies(){
    const sql = "SELECT * FROM movies";
    const [rows] = await pool.execute(sql)
    return rows
}

export async function findMovie(movie_public_id:string){
    const sql = "SELECT * FROM movies WHERE movie_public_id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(sql, [movie_public_id]);
    return rows[0] ?? null;
}

export async function updateMovie(movie_public_id:string,data:updateMovieInput){
    const keys = Object.keys(data);
    const fields = keys.map(k => `${k} = ?`).join(", ")
    const values = keys.map(k => (data as any)[k])

    const sql = `UPDATE movies SET ${fields} WHERE movie_public_id = ?`
    await pool.execute(sql, [...values, movie_public_id])
}