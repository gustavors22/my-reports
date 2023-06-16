import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import User from "../entity/User";

const prisma = new PrismaClient();
const process = require("process");

class UserRepository {
    public async create(user: User): Promise<User> {
        const saltRounds = process.env.SALT_ROUNDS;
        user.password = await bcrypt.hash(user.password, parseInt(saltRounds));

        const createdUser = await prisma.user.create({
            data: user
        });

        return createdUser;
    }

    public async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();

        return users;
    }

    public async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }
}

export default new UserRepository();