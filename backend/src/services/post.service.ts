import { Post } from "../entities/post";

export async function getPostById(id: number): Promise<Post | null> {
    return Post.findOne({
        relations: {
            user: true
        },
        where: {
            id : id
        }
    })
}

export function getAllPosts(): Promise<Post[] | undefined>{
    return Post.find({
        relations: ['user', 'commentary']
    });
}

export function create(description: string, ctx: any): Promise<Post> {
    const newPost = new Post();
    newPost.description = description;
    newPost.user = ctx.user.id;
    
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