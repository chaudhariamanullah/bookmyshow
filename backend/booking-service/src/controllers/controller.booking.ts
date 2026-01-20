import type { Request, Response } from "express";
import { AddBookingSchema } from "../schemas/schema.addBooking.js";
import bookingService from "../services/service.booking.js";

const bookingController = {

    async booking(req:Request,res:Response){
        try{
            const booking = AddBookingSchema.parse(req.body);
            const booked = await bookingService.booking(booking);

            if(booked)
                return res.status(201).json({message:"Booking Intiated"});
            else
                return res.status(409).json({message:"Some Error Occured"});

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async confirmBooking(req:Request,res:Response){
        try{
            const booking_public_id = req.params.booking_public_id as string;
            const confirm = await bookingService.confirmBooking(booking_public_id);

            if(confirm)
                return res.status(200).json({message:"Booking Completed"});
            else
                return res.status(409).json({message:"Some Error Occured"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async cancelBooking(req:Request,res:Response){
        try{
            const booking_public_id = req.params.booking_public_id as string;
            const cancel = await bookingService.cancelBooking(booking_public_id);

            if(cancel)
                return res.status(200).json({message:"Booking Cancelled"});
            else
                return res.status(409).json({message:"Some Error Occured"});

        }catch(err){
            return res.status(500).json({error:err});
        }
    },

    async failedBooking(req:Request,res:Response){
        try{
             const pending = await bookingService.failedBooking();

            if(pending)
                return res.status(200).json({message:"Booking Status Changed To Failed"});
            else
                return res.status(409).json({message:"Some Error Occured"});
        }catch(err){
            return res.status(500).json({error:err});
        }
    }
}

export default bookingController;