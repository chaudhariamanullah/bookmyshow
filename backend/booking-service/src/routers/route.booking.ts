import { Router } from "express";
import bookingController from "../controllers/controller.booking.js";


const router = Router();

router.post("",bookingController.booking);
router.post("/:booking_public_id/confirm",bookingController.confirmBooking);
router.post("/:booking_public_id/cancel",bookingController.cancelBooking);
router.post("/fail",bookingController.failedBooking);

export default router;