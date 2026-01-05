import { v4 as uuidv4 } from 'uuid';
import MovieModel from "../models/model.movies.js";
import type { Movie } from '../types/movies.js';
import type { updateMovieInput } from '../schemas/movie/updateMovie.schema.js';
import type { addLangugeInput } from "../schemas/movie/movieLanguage.schema.js";
import type { addCastInput } from "../schemas/movie/MovieCast.schema.js";

const MovieService = {

    async findAll(){
        return await MovieModel.fetchAll();
    },

    async create(movie: Omit<Movie,"movie_public_id"|"created_at"|"updated_at">) {
            const movie_public_id = uuidv4();
            const movieData = {movie_public_id,...movie};
            return await MovieModel.insert(movieData);
    },

    async findOne(movie_public_id:string){
        return await MovieModel.fetchOne(movie_public_id);
    },

    async edit(movie_public_id:string,data:updateMovieInput){
        return await MovieModel.update(movie_public_id,data);
    },

    async remove(movie_public_id:string){
        return await MovieModel.deleteMovie(movie_public_id);
    },

    async getLanguages(movie_public_id:string){
        return await MovieModel.fetchLanguages(movie_public_id);
    },

    async addLanguages(movie_public_id:string,languages:addLangugeInput){
        return await MovieModel.addLanguages(movie_public_id,languages);
    },

    async removeLanguage(movie_public_id:string,language_id:string){
        return await MovieModel.deleteLanguage(movie_public_id,language_id);
    },

    async findCast(movie_public_id:string){
        return await MovieModel.fetchCast(movie_public_id);
    },

    async addCast(movie_public_id:string,castList:addCastInput){
        const size:number = castList.actors_public_id.length;
        let cast_public_id:string[] = [];

        for (let i = 0; i < size ; i++){
            cast_public_id.push(uuidv4());
        }

        const fullCastList = {
            cast_public_id,
            ...castList
        }

        return await MovieModel.addCast(movie_public_id,fullCastList);
    },

    async removeCast(movie_public_id:string, cast_id :string){
        return await MovieModel.deleteCast(movie_public_id, cast_id);
    }
}

export default MovieService;