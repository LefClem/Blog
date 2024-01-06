import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities/user";
import * as UserServices from '../services/user.service'

@Resolver(User)
export class UserResolver {
    @Query(() => [User])
    getUser(): Promise<User[]> {
        return UserServices.getAllUsers();
    }

    @Mutation(() => User)
    createUser(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User>{
        return UserServices.signup(email, password);
    }

    @Mutation(() => String)
    register(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<String>{
        return UserServices.login(email, password);
    }
}