import { create, deleteById } from "./post.service"

jest.mock('../services/post.service', () => ({
    create: jest.fn().mockImplementation((description: string) => {
        if(!description){
            return false;
        } else {
            return description
        }
    }),
    deleteById: jest.fn().mockImplementation((id: number) => {
        if(!id){
            return false
        } else {
            return 'post deleted'
        }
    })
}))

describe("Post service", () => {

    it("should create a new post", async () => {
        const description = "un post test";

        const result = await create(description);
        console.log(result);

        expect(result).toBe("un post test");
    })

    it("should send an error if there is no description", async () => {
        const description = '';

        const result = await create(description);        
        expect(result).toBe(false);
    })
})