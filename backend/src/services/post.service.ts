import { Post } from "../entities/post";
import { Context } from 'apollo-server-core'
import { User } from "../entities/user";
require('dotenv').config()

export async function getPostById(id: number): Promise<Post | null> {
    
    
    const result = await Post.findOne({
        relations: {
            user: true,
            commentaries: true
        },
        where: {
            id : id
        }
    })
    
    return result;
}

export function getAllPosts(): Promise<Post[] | undefined>{    
    return Post.find({
        relations: {
            user: true,
            commentaries: true
        }
    });
}

export function create(description: string, ctx?: any): Promise<Post> {
    const newPost = new Post();
    newPost.description = description;
    newPost.user = ctx && ctx.user.id;
    
    return newPost.save();
}

export async function deleteById(id: number, ctx: any): Promise<string>{
    console.log(ctx);
    
    const post = await Post.findOne({
        relations: {
            user: true,
            commentaries: true
        },
        where: {
            id : id
        }
    })    
    if(!post){
        return ('No post found')
    } else if(post?.user.id !== ctx.user.id){
        return ('Not authorized')
    } 
    const result = await Post.delete({ id : id });
    if(result.affected === 0){
        return "This post doesn't exist"
    } else {
        return "Ok";
    }
}