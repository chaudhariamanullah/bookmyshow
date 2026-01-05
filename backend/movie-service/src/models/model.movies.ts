import pool from "../config/db.js";
import type { Movie } from '../types/movies.js';
import type { RowDataPacket } from "mysql2";
import type { updateMovieInput } from '../schemas/movie/updateMovie.schema.js';
import type { AddLanguagesList } from "../types/movie_languages.js";
import type { InputCast } from "../types/inputCast.type.js"

const MovieModel = {
    async insert(movieData:Omit<Movie,"created_at"|"updated_at">){
        const sql = "INSERT INTO movies(movie_public_id,title,poster_url,released_at) VALUES(?,?,?,?)";
        await pool.execute(sql, [
            movieData.movie_public_id,
            movieData.title,
            movieData.poster_url,
            movieData.released_at,
        ])
    },

    async fetchAll(){
        const sql = "SELECT * FROM movies";
        const [rows] = await pool.execute(sql)
        return rows
    },

    async fetchOne(movie_public_id:string){
        const sql = "SELECT * FROM movies WHERE movie_public_id = ?";
        const [rows] = await pool.execute<RowDataPacket[]>(sql, [movie_public_id]);
        return rows[0] ?? null;
    },

    async update(movie_public_id:string,data:updateMovieInput){
        const keys = Object.keys(data);
        const fields = keys.map(k => `${k} = ?`).join(", ")
        const values = keys.map(k => (data as any)[k])

        const sql = `UPDATE movies SET ${fields} WHERE movie_public_id = ?`
        return await pool.execute(sql, [...values, movie_public_id]);
    },

    async deleteMovie(movie_public_id:string){
        const sql = "DELETE FROM movies WHERE movie_public_id = ?";
        await pool.execute(sql,[movie_public_id]);
    },

    async fetchLanguages(movie_public_id:string){

        const sql = `SELECT l.language_name
                        FROM languages l
                        JOIN movie_language ml ON ml.language_id = l.language_id
                        JOIN movies m ON m.movie_id = ml.movie_id
                        WHERE m.movie_public_id = ?`;
        
        return await pool.execute(sql,[movie_public_id]);
    },

    async addLanguages(movie_public_id:string,languages:AddLanguagesList){
        const placeholders = languages.language_ids.map(() => '?').join(','); 
        const sql = `INSERT INTO movie_language (movie_id, language_id)
                    SELECT m.movie_id, l.language_id
                    FROM movies m
                    JOIN languages l ON l.language_id IN (${placeholders})
                    WHERE m.movie_public_id = ?`;
        return await pool.execute(sql, [...languages.language_ids, movie_public_id]);
    },

    async deleteLanguage(movie_public_id:string,language_id:string){
        const sql = `DELETE ml
                    FROM movie_language ml
                    JOIN movies m 
                    ON m.movie_id = ml.movie_id
                    WHERE ml.language_id = ?
                    AND 
                    m.movie_public_id = ?`;
        return await pool.execute(sql,[movie_public_id,language_id])
    },

    async fetchCast(movie_public_id:string){
        const sql = `SELECT mc.cast_public_id, mc.movie_id, mc.actor_id, mc.role FROM movie_cast mc
                     JOIN movies m ON mc.movie_id = m.movie_id
                     WHERE m.movie_public_id = ?`
        
        return await pool.execute(sql,[movie_public_id]);
    },

    async addCast(movie_public_id:string,fullMovieCast:InputCast){
        const sql = `INSERT INTO movie_cast(cast_public_id,movie_id,actor_id,role)
                     SELECT m.movie_id FROM movies m
                     JOIN mc.movie_id ON mc.movie_id = m.movie_id`
    },

    async deleteCast(movie_public_id:string, cast_public_id:string){
        const sql = `DELETE mc FROM movie_cast mc
                     JOIN movies m ON m.movie_id = mc.movie_id
                     WHERE m.movie_public_id = ? AND
                     mc.cast_public_id = ?`
        return pool.execute(sql,[movie_public_id,cast_public_id])
    }
}

export default MovieModel;

