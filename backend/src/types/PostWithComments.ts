import { ObjectType, Field } from "type-graphql";
import { Post } from "../entities/post";
import { Commentary } from "../entities/commentary";

@ObjectType()
export class PostWithComments {
    @Field(() => Post)
    post: Post;

    @Field(() => [Commentary])
    comments: Commentary[];
}
