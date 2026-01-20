import seatRouter from "../src/routers/router.seats.js";
import express from "express";

const app = express();

app.use(express.json());

app.use("/theaters/:theater_public_id/screens/:screen_public_id/seats/",seatRouter);

export default app;