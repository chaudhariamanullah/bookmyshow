import authRouter from "../src/routers/route.auth.js";
import express from "express";
import session  from "express-session";
import passport from "passport";

const app = express();

app.use(session({ 
    secret: 'JBJqGTnY4V7w9dce8A0ti7iSY', 
    resave: false, 
    saveUninitialized: false 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",authRouter);

export default app;