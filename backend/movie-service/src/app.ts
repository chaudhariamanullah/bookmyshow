import express from "express"
import movieRoutes from "./routes/movies.routes.js"
import actorRoutes from "./routes/actors.route.js";
import languageRoutes from "./routes/language.route.js";

const app = express()

app.use(express.json());
app.use("/movies", movieRoutes);
app.use("/actors", actorRoutes);
app.use("/languages", languageRoutes)

export default app
