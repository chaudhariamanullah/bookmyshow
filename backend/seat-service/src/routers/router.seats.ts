import { Router } from "express";
import seatsCotroller from "../controllers/controller.seats.js";
const router = Router();

router.get("/", seatsCotroller.getSeats);
router.get("/available",seatsCotroller.getAvailableSeats);
router.get("/counts",seatsCotroller.getSeatCount);

router.post("/",seatsCotroller.addSeats);
router.delete("/:seat_public_id",seatsCotroller.removeSeat);

router.post("/:seat_public_id/book",);
router.post("/:seat_public_id/cancel",);
router.post("/:seat_public_id/hold",);


export default router;
