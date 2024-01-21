import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Post } from "../entities/post";
import * as PostServices from '../services/post.service'
import { DeleteResult } from "typeorm";
import { Context } from 'apollo-server-core'

@Resolver(Post)
export class PostResolver {
    @Authorized()
    @Query(() => Post)
    getPost(
        @Arg("id") id: number,
    ): Promise<Post | null> {
        return PostServices.getPostById(id);
    }

    @Authorized()
    @Query(() => [Post])
    getPosts(
        @Ctx() ctx: any
    ): Promise<Post[] | undefined>{
        return PostServices.getAllPosts();
    }

    @Authorized()
    @Mutation(() => Post)
    newPost(
        @Ctx() ctx: Context,
        @Arg("description") description: string
    ): Promise<Post>{
        console.log(ctx);
        return PostServices.create(description, ctx);
    }

    @Authorized()
    @Mutation(() => String)
    deletePost(
        @Arg("id") id: number
    ): Promise<string> {
        return PostServices.deleteById(id);
    }
}