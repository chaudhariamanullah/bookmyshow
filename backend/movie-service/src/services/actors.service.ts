import { v4 as uuidv4 } from 'uuid';
import type { createActorInput } from "../schemas/actors/inputActor.schema.js";
import type { editActorInput } from "../schemas/actors/editActor.schema.js";

import actorModel from "../models/model.actors.js";

const actorService = {
    async find(actor_public_id:string){
        return await actorModel.find(actor_public_id);
    },
    async create(actorData:createActorInput){
        const actor_public_id = uuidv4();
        const actorFullData = {
            actor_public_id,
            actor_name: actorData.actor_name,
            actor_dob: actorData.actor_dob,
            actor_country: actorData.actor_country,
            actor_city: actorData.actor_city,
            actor_spouse: actorData.actor_spouse ?? null
        };
        return await actorModel.create(actorFullData);
    },
    async edit(actorData:editActorInput,actor_public_id:string){
        return await actorModel.update(actorData,actor_public_id);
    },
    async remove(actor_public_id:string){
        return await actorModel.delete(actor_public_id);
    },
}

export default actorService;