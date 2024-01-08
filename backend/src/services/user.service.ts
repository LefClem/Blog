import { User } from "../entities/user";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export function getAllUsers(): Promise<User[]> {
    return User.find();
}

export function verifyToken(token: string){
    // if()
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
        const token = jwt.sign({
            email: email,
        }, "iojdieoapjdieozhduioezhudoiezndopjazdjao");

        console.log(token);
        
        return token;
    } else {
        return "Auht failed"
    }
}