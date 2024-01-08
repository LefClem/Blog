import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post";
import * as PostServices from '../services/post.service'
import { DeleteResult } from "typeorm";

@Resolver(Post)
export class PostResolver {
    @Query(() => Post)
    getPost(
        @Arg("id") id: number
    ): Promise<Post | null> {
        return PostServices.getPostById(id);
    }

    @Query(() => [Post])
    getPosts(): Promise<Post[]>{
        return PostServices.getAllPosts();
    }

    @Mutation(() => Post)
    newPost(
        @Arg("description") description: string,
    ): Promise<Post>{
        return PostServices.create(description);
    }

    @Mutation(() => String)
    deletePost(
        @Arg("id") id: number
    ): Promise<string> {
        return PostServices.deleteById(id);
    }
}