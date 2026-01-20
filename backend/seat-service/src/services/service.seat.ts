import seatModel from "../models/model.seats.js";
import type { AddSeatsInput } from "../schemas/schema.addSeats.js";
import { nanoid } from 'nanoid';

const seatServices = {
    async getSeats(screen_public_id:string){

        if(!screen_public_id){
                return false
        }

        return await seatModel.fetchSeats(screen_public_id);
    },

    async getAvailableSeats(screen_public_id:string){
        
        if(!screen_public_id){
                return false
        }

        return await seatModel.fetchAvailableSeats(screen_public_id)
    },

    async getSeatCount(screen_public_id:string){

        if(!screen_public_id){
                return false
        }

        return await seatModel.fetchSeatCount(screen_public_id);
    },

    async addSeats(seats:AddSeatsInput){
        
        let seat_public_id:string[] = [];

        for(let i= 0; i < seats.total_seats.length; i++){
            let id = nanoid(8);
            seat_public_id.push(id);
        }

        return await seatModel.insertSeats({
            ...seats,
            seat_public_id
        });
    },

    async removeSeat(seat_public_id:string){

        if(!seat_public_id){
                return false
        }

        return await seatModel.deleteSeat(seat_public_id);
    },

    async bookSeat(seat_public_id:string){

        if(!seat_public_id){
                return false;
        }

        return await seatModel.bookSeat(seat_public_id);
    },

    async cancelSeat(seat_public_id:string){

        if(!seat_public_id){
                return false;
        }

        return await seatModel.cancelSeat(seat_public_id);
    },
    
    async holdSeat(seat_public_id:string){

        if(!seat_public_id){
                return false;
        }

        return await seatModel.holdSeat(seat_public_id)
    },

    async freeSeats(){
        
        return await seatModel.freeSeats();
    }

}

export default seatServices;