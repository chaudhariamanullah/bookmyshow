import express from "express";
import UserRoute from "../src/route/route.users.js";

const app = express();

app.use("/users", UserRoute);

export default app;