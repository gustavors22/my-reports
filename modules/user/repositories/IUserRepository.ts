import User from "../entity/User";

export default interface IUserRepository {
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}