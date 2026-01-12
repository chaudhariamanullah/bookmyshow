import type { addTheatreInput } from "../schemas/theaters/inputTheatre.schema.js";
import type { EditTheatreInput } from "../schemas/theaters/editTheatre.schema.js";
import { v4 as uuidv4 } from "uuid";
import TheatreModel from "../model/model.theatres.js";

const TheatreService = {
    async findOne(theatre_public_id:string){
        return await TheatreModel.fetchOne(theatre_public_id);
    },

    async findAll(){
        return await TheatreModel.fetchAll();
    },

    async add(theatre:addTheatreInput){
        const theatre_public_id = uuidv4();
        const fullTheatreDetails = {
            theatre_public_id,
            ...theatre
        }

        return await TheatreModel.insert(fullTheatreDetails);
    },

    async edit(theatre:EditTheatreInput,theatre_public_id:string){
        return await TheatreModel.update(theatre,theatre_public_id);
    },

    async remove(theatre_public_id:string){
        return await TheatreModel.deleteTheatre(theatre_public_id);
    }
}

export default TheatreService;