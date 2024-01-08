import { DeleteResult } from "typeorm";
import { Post } from "../entities/post";

export async function getPostById(id: number): Promise<Post | null> {
    return Post.findOne({
        // relations: {
        //     user: true
        // },
        where: {
            id : id
        }
    })
}

export function getAllPosts(): Promise<Post[]>{
    return Post.find();
}

export function create(description: string): Promise<Post> {
    const newPost = new Post();
    newPost.description = description;

    return newPost.save();

}

export async function deleteById(id: number): Promise<string>{
    const result = await Post.delete({ id : id });
    console.log(result);
    if(result.affected === 0){
        return "This post doesn't exist"
    } else {
        return "Ok";
    }
}