import IJwtService from "./IJwtService";
import jwt from "jsonwebtoken";

class JwtService implements IJwtService {
    private secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || "defaultSecret";
    }

    public sign(payload: any): string {
        const token = jwt.sign(payload, this.secret, {expiresIn: '1d'});
        return token;
    }
}

export default new JwtService();
