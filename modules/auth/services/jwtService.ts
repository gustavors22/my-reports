import IJwtService from "./IJwtService";
import jwt from "jsonwebtoken";

class JwtService implements IJwtService {
    private secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || "defaultSecret";
    }

    public sign(payload: string | object): string {
        const token = jwt.sign(payload, this.secret, {expiresIn: '1d'});
        return token;
    }

    public verify(token: string): string | object {
        const decoded = jwt.verify(token, this.secret);
        return decoded;
    }
}

export default new JwtService();
