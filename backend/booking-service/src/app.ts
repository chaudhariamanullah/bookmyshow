import express from "express";
import bookingRouter from "../src/routers/route.booking.js";
const app = express();

app.use(express.json());

app.use("/showtimes/:showtime_public_id/booking",bookingRouter);

export default app;