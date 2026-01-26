import { Router } from "express";
import passport from "passport";
import authController from "../controllers/cobtroller.auth.js";

const router = Router();

router.get("/google",passport.authenticate(
            'google',{
            scope:['profile','email']
}),);

router.get("/google/callback",passport.authenticate(
            'google',{
            failureRedirect: '/login' 
}),);

router.post("/signup", authController.localSignup)

router.post("/logout", authController.localSignup);

export default router;