import {TokenService} from "../../application/interface/service/i-token-service";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";


export class JwtTokenService implements TokenService{

    generate(payload: any): string {
        return jwt.sign(payload, env.SECRET, { expiresIn: env.EXPIRESIN });
    }

    verify(token: string): any {
        try {
            return jwt.verify(token, env.SECRET);
        } catch (error) {
            throw new Error("Invalid token");
        } 

    }  

}