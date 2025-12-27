import { v4 as uuidv4 } from 'uuid';
import { insertMovie,findAllMovies, findMovie, updateMovie } from '../models/movies.js';
import type { Movie } from '../types/movies.js';
import type { updateMovieInput } from '../schemas/movie/updateMovie.schema.js';

export async function getAllMovies(){
    return await findAllMovies()
}

export async function createMovie(movie: Omit<Movie,"movie_public_id"|"created_at"|"updated_at">) {
    const movie_public_id = uuidv4();
    const movieData = {movie_public_id,...movie}
    await insertMovie(movieData)
}

export async function getMovie(movie_public_id:string){
    return await findMovie(movie_public_id);
}

export async function editMovie(movie_public_id:string,data:updateMovieInput){
   await updateMovie(movie_public_id,data);
}