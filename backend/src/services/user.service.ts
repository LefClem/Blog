import { User } from "../entities/user";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';

export function getUser(email: string): Promise<User> {
    return User.findOneByOrFail({ email });
}

export function verifyToken(token: string){        
    if(!process.env.JWT_SECRET_KEY){
        return {}
    } else {
        return jwt.verify(token ,process.env.JWT_SECRET_KEY);
    }
} 

export async function signup(email: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.email = email;
    newUser.password = await argon2.hash(password);
    newUser.role = "USER";

    return newUser.save();
}

export async function login(email: string, password: string): Promise<string> {

    try {
        // Récupérer l'utilisateur dans la bdd suivant l'email
        const user = await User.findOneByOrFail({ email });
        
        // Vérifier que ce sont les même mots de passe
        if (
          await argon2.verify(user.password, password)
        ) {
          // Créer un nouveau token => signer un token
          const token = signJwt({
            email: user.email,
            role: user.role,
          });
  
          // Renvoyer le token
          return token;
        } else {
          throw new Error();
        }
      } catch (e) {
        throw new Error("Invalid Auth");
      }
}

export function signJwt(payload: any) {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }
  
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
  }