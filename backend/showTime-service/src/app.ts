import express from "express";
import showTimeRouter from "../src/routers/router.showTime.js";
const app = express();

app.use(express.json())
app.use("/showtime", showTimeRouter);

export default app;