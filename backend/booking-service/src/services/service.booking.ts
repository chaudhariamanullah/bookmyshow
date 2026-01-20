import bookingModel from "../models/model.booking.js";
import type { AddBookingInput } from "../schemas/schema.addBooking.js";

const bookingService = {
    async booking(booking:AddBookingInput){
        return await bookingModel.booking(booking);
    },

    async confirmBooking(booking_public_id:string){
        if(booking_public_id)
            return false;
        return await bookingModel.confirmBookingStatus(booking_public_id);
    },

    async cancelBooking(booking_public_id:string){
        if(booking_public_id)
            return false;
        return await bookingModel.cancelBookingStatus(booking_public_id);
    },

    async failedBooking(){
        return await bookingModel.failedBookingStatus();
    }
}

export default bookingService;