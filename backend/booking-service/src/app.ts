import express from "express";

const app = express();

app.use(express.json());

app.use("/showtimes/:showtime_public_id/booking",);

export default app;