import type { Profile, VerifyCallback } from 'passport-google-oauth20';
import type { User } from "../types/type.user.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID as string,
      clientSecret: process.env.clientSecret as string,
      callbackURL: '/auth/google/callback',
    }, 
    async (accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback) => {
          try{

            const res = await fetch("http://localhost:3002/users", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              user_id:profile.id,
              first_name: profile.name?.givenName,
              last_name: profile.name?.familyName,
              email: profile.emails?.[0]?.value,
              auth_app: profile.provider})
            });

            if (!res.ok) {
                return done(new Error("User service error"));
            }

             const user = await res.json() as User;
             return done(null, user);
          } catch (err){
            return done(err);
          }
    })
);