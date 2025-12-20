import app from './app.js';
import { getAllMovies } from './services/service.js';
import type { Request, Response } from 'express';

app.get("/",(req:Request,res:Response)=>{
    res.json(getAllMovies());
});

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Movie service running on port ${PORT}`)
})