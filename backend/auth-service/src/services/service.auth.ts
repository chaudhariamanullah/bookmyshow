import type { LocalSignupInput } from "../schema/schema.localSignup.js";
import type { LocalLoginInput } from "../schema/schema.localLogin.js";
import type { UserResponse } from "../types/type.responseUser.js";

const authService = {
    async localSignup(user:LocalSignupInput){
        const sent = await fetch("http://localhost:3002/users", {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        });

        if (!sent.ok)
            return false
        else
            return true
    },

    async localLogin(user:LocalLoginInput){
        const res = await fetch("http://localhost:3002/users/fetchOneByEmailAndPassword", {
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email:user.email,
                password:user.password
            })
        });

        if (!res.ok) return false

        const data = ( await res.json() ) as UserResponse
        
        if ( data.user_email === user.email)
            return true
        else
            return false
    }
}

export default authService;