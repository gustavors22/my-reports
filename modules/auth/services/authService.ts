import User from "../../user/entity/User";
import IUserRepository from "../../user/repositories/IUserRepository";
import IJwtService from "./IJwtService";
import bcrypt from "bcryptjs";

interface ICredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

class AuthService {
    constructor(
        private userRepository: IUserRepository,
        private jwtService: IJwtService
    ) {}

    public async login(credentials: ICredentials): Promise<LoginResponse> {
        const { email, password } = credentials;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
    
        const token = this.jwtService.sign({ id: user.id });
        
        return { token, user };
    }
}

export default AuthService;