import { config } from "../models/types.ts";
import { MongoConnection } from "./mongoConnection.ts"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


export class UserDatasource {
    private database: MongoConnection

    constructor(database: MongoConnection) {
        this.database = database
    }

    async deleteUser(userId: string): Promise<boolean> {
        const userModel = await this.database.getUserModel();
        const moodModel = await this.database.getMoodModel();

        await moodModel.deleteMany({ userId });
        const deletedUser = await userModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return false;
        }

        return true;
    }

    async login(email: string, password: string): Promise<{ token: string; } | null> {
        const userModel = await this.database.getUserModel();
        const user = await userModel.findOne({ email });
        if (!user) {
            return null;
        }
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return null;
        }

        const token = jwt.sign(
            { id: user._id, },
            config.jwtSecret,
        );

        return { token };
    }

    async register(params: RegisterParams): Promise<
        {
            userEmail: string;
            userName: string;
        }
        | null
    > {
        const userModel = await this.database.getUserModel();
        const { userEmail, userName, password } = params;

        const existingUser = await userModel.findOne({ email: userEmail });
        if (existingUser) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email: userEmail,
            password: hashedPassword,
            username: userName,
        });

        return {
            userEmail: user.email,
            userName: user.username,
        };
    }
}


interface RegisterParams {
    userEmail: string
    userName: string
    password: string
}