import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post";
import * as PostServices from '../services/post.service'
import { DeleteResult } from "typeorm";

@Resolver(Post)
export class PostResolver {
    @Authorized()
    @Query(() => Post)
    getPost(
        @Arg("id") id: number
    ): Promise<Post | null> {
        return PostServices.getPostById(id);
    }

    @Authorized()
    @Query(() => [Post])
    getPosts(): Promise<Post[]>{
        return PostServices.getAllPosts();
    }

    @Authorized()
    @Mutation(() => Post)
    newPost(
        @Arg("description") description: string,
    ): Promise<Post>{
        return PostServices.create(description);
    }

    @Authorized()
    @Mutation(() => String)
    deletePost(
        @Arg("id") id: number
    ): Promise<string> {
        return PostServices.deleteById(id);
    }
}