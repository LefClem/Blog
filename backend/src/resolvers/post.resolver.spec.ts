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
        await PostService.create("Test");

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

        expect(response.errors).toBeUndefined();
        expect(response.data?.getPost).toBeDefined();
        expect(response.data?.getPost.id).toBe(1);
        expect(response.data?.getPost.description).toBe('Test');
    })

    it("should delete a post", async () => {
      const postQuery = gql`
      mutation Mutation($deletePostId: Float!) {
        deletePost(id: $deletePostId)
      }
      `;

      const response = await server.executeOperation({
        query: postQuery,
        variables: {
          deletePostId: 1
        }
      });      

      expect(response.errors).toBeDefined();
      expect(response.errors?.[0].message).toBe(`Vous n'êtes pas authentifier`)
    })
})