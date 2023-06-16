type User = {
    id?: string;
    email: string;
    phone?: string | null;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;