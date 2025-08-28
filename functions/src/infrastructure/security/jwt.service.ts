import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";
import {injectable} from "tsyringe";
import {IAuthService} from "@/domain/auth/auth.service";
import {loadCredentials} from "@/config/enviroment";

const {JWT_SECRET} = loadCredentials();

@injectable()
export class JwtService implements IAuthService {
  sign(payload: object, expiresIn: SignOptions["expiresIn"] = "12h"): string {
    const options: SignOptions = {expiresIn};
    return jwt.sign(payload, JWT_SECRET, options);
  }

  verify(token: string): string | JwtPayload {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }
}
