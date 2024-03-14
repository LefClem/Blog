import { Commentary } from "../entities/commentary";
import { Post } from "../entities/post";

export async function create(commentary: string, postId: number): Promise<Commentary | undefined>{
    try {
        const post = await Post.findOne({
            where: {
                id: postId
            }
        })
        if (!post) {
            throw new Error("Post not found");
        }
        const newCommentary = new Commentary;
        newCommentary.commentary = commentary;
        newCommentary.post = post;        

        return newCommentary.save();
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export async function getComments(): Promise<Commentary[] | undefined> {
    let post = await Commentary.find();
    console.log(post);
    
    return Commentary.find();
}