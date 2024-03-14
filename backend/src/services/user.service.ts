import { User } from "../entities/user";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export function getUser(email: string): Promise<User> {
    return User.findOneByOrFail({ email });
}

export function verifyToken(token: string){        
    // if(!process.env.JWT_SECRET_KEY){
    //     return {}
    // } else {
        return jwt.verify(token ,'process.env.JWT_SECRET_KEY');
    // }
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
    console.log(process.env.JWT_SECRET_KEY);
    

    if (await argon2.verify(user.password, password)) {
        const token = jwt.sign({
            email: email,
            userId: user.id
        }, 'process.env.JWT_SECRET_KEY'
        , { expiresIn: '1h' });

        const authUser = verifyToken(token);
        console.log(authUser);
        
        
        return token;
    } else {
        return "Auht failed"
    }
}