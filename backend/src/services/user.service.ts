import { User } from "../entities/user";
import * as argon2 from 'argon2'

export function getAllUsers(): Promise<User[]> {
    return User.find();
}

export async function signup(email: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.password = await argon2.hash(password);
    newUser.role = "USER";

    return newUser.save();
}

export async function login(email: string, password: string): Promise<string> {
    const user = await User.findOneByOrFail({ email });

    if (await argon2.verify(user.password, password)) {
        return "Connecté"
    } else {
        return "erreur"
    }

}