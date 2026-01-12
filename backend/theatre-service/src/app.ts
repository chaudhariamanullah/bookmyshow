import express from "express";
import TheatreRoute from "../src/route/route.theatres.js";
import TheatreScreenRoute from "../src/route/route.screens.js";
const app = express();

app.use( express.json() );
app.use("/theaters", TheatreRoute);
app.use("/theaters/:theatre_public_id/theatre_screen", TheatreScreenRoute);

export default app;