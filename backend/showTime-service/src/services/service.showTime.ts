import type { AddShowTimeInput } from "../schemas/schema.addShowTime.js";
import type { EditShowTimeInput } from "../schemas/schema.editShowTime.js";
import type { filterQueryInput } from "../schemas/schema.filterQuery.js";
import type { ValidateShowtimeInput } from "../schemas/schema.validateShowtime.js";
import showTimeModel from "../models/model.showTime.js";
import { v4 as uuidv4 } from "uuid";

const showTimeService = {

    async filterShow(filters:filterQueryInput){
        return await showTimeModel.filterShowtime(filters);
    },

    async add(showtime:AddShowTimeInput){
        const showTime_public_id = uuidv4();
        const date = showtime.dateTime.toISOString().slice(0, 10);
        const time = showtime.dateTime.toISOString().slice(11,19);

        return await showTimeModel.insert({
            showTime_public_id,
            ...showtime,
            date,time
        });
    },

    async edit(showtime:EditShowTimeInput,showTime_public_id:string){
        return await showTimeModel.update(showtime,showTime_public_id);
    },

    async housefull(showTime_public_id:string){
        return await showTimeModel.housefull(showTime_public_id);
    }, 

    async cancel(showTime_public_id:string){
        return await showTimeModel.cancel(showTime_public_id);
    },

    async getShowTime(showTime_public_id:string){
        return await showTimeModel.fetchShowTime(showTime_public_id);
    },

    async available(showTime_public_id:string){
        return await showTimeModel.available(showTime_public_id);
    },

    async validate(value:ValidateShowtimeInput){
        const date = value.dateAndTime.toISOString().slice(0,10);
        const time = value.dateAndTime.toISOString().slice(11,19);
        const screen_public_id = value.screen_public_id;
        return await showTimeModel.validate(date,time,screen_public_id);
    },

    async getShowTimeAtScreen(showTime_public_id:string){
        return await showTimeModel.fetchShowTimeAtScreen(showTime_public_id);
    }
}

export default showTimeService;