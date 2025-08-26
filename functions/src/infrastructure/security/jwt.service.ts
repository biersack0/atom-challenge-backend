import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export class JwtService {
    constructor(private secret: string) { }
    sign(payload: object, expiresIn: string | number = "12h"): string {
        const options: SignOptions = { expiresIn: expiresIn as number };
        return jwt.sign(payload, this.secret, options);
    }

    verify(token: string): string | JwtPayload {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error("Token inválido o expirado");
        }
    }
}
