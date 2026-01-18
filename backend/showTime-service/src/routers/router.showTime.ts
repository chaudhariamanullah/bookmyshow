import { Router } from "express";

const router = Router();

router.get("/"); //Query Params Passes For Filtering
router.post("/");  //Add
router.patch("/:showTime_public_id")  //update any detail
router.post("/:showTime_public_id/housefull");
router.post("/:showTime_public_id/cancel");

router.get("/:showtime_public_id"); //get a specific show-time detail

router.get("/:showtime_public_id/availability"); //check all available showtimes

router.post("/validate-slot"); //Validate slot befor adding
router.get("/screen/:scree_public_id"); //check all showtimes on a particular date on particular screen

export default router;