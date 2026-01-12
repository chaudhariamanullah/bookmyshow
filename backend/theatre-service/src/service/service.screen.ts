
import type { addTheatreScreenInput } from "../schemas/screens/addScreen.schema.js";
import type { editTheatreScreenInput } from "../schemas/screens/editScreen.schema.js";
import TheatreScreenModel from "../model/model.screen.js";
import { v4 as uuidv4 } from "uuid";

const TheatreScreenService = {
    async findOne(theatre_public_id:string, theatre_screen_public_id:string){
        return await TheatreScreenModel.fetchOne(theatre_public_id,theatre_screen_public_id);
    },

    async findAll(theatre_public_id:string){
        return await TheatreScreenModel.fetchAll(theatre_public_id);
    },

    async add(screen:addTheatreScreenInput,theatre_public_id:string){
        const screen_public_id = uuidv4();
        const screenDetails = {
            screen_public_id,
            ...screen
        }
        return await TheatreScreenModel.insert(screenDetails,theatre_public_id);
    },

    async edit(screen:editTheatreScreenInput,theatre_public_id:string){
        return await TheatreScreenModel.update(screen,theatre_public_id);
    },

    async remove(theatre_public_id:string, theatre_screen_public_id:string){
        return await TheatreScreenModel.delete(theatre_public_id,theatre_screen_public_id);
    },
}

export default TheatreScreenService;