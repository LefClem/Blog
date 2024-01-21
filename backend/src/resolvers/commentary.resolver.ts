import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Commentary } from "../entities/commentary";
import * as CommentaryServices from '../services/commentary.service'
import { Post } from "../entities/post";

@Resolver(Commentary)
export class CommentaryResolver {
    @Mutation(() => Commentary)
    addCommentary(
        @Arg("commentary") commentary: string,
        @Arg("postId") postId: number
    ): Promise<Commentary | undefined> {
        return CommentaryServices.create(commentary, postId)
    }

    @Query(() => [Commentary])
    getCommentaries(): Promise<Commentary[] | undefined> {
        return CommentaryServices.getComments();
    }
}