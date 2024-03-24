import { ApolloServer, gql } from "apollo-server"
import createServer from "../config/server";
import * as PostService from "../services/post.service"

describe("Post resolver", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await createServer();
    })

    it("should return all posts", async () => {
        const postQueries = gql`
        query Query {
            getPosts {
              id
              description
            }
          }
        `;

        const response = await server.executeOperation({
            query: postQueries
        })

        expect(response.errors).toBeUndefined();
        expect(response.data?.getPosts).toBeDefined();
    })

    it("should return a post by id", async () => {
        await PostService.create("Test", 1);

        const postQuery = gql`
        query Query($getPostId: Float!) {
            getPost(id: $getPostId) {
              id
              description
            }
          }
        `;

        const response = await server.executeOperation({
            query: postQuery,
            variables: {
                getPostId: 1
            }
        })
        console.log(response);
        

        expect(response.errors).toBeUndefined();
        expect(response.data?.getPost).toBeDefined();

    })
})