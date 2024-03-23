import { ApolloServer, gql } from "apollo-server"
import createServer from "../config/server";
import * as PostService from "../services/post.service";


describe("Category resolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = await createServer();
  });

  it("should return all posts", async () => {
    const postsQuery = gql`
      query Post {
        getPosts {
          id
          description
        }
      }
      `;

      const response = await server.executeOperation({
        query: postsQuery
      });
      

      expect(response.errors).toBeUndefined();
      expect(response.data).toBeDefined();
  });

  it("should return a post by id",  async () => {
    const postQuery = gql`
    query GetPostById($getPostId: Float!) {
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
      });      

    expect(response.data?.getPost).toBeDefined();
    expect(response.data?.getPost.description).toBe("test");
  });

  // it("should create a new post", async () => {
  //   const postQuery = gql`
  //   mutation Mutation($description: String!) {
  //     newPost(description: $description) {
  //       id
  //       description
  //     }
  //   }
  //   `;

  //   const response = await server.executeOperation({
  //     query: postQuery,
  //     variables: {
  //       description: "Un post pour le test"
  //     }
  //   });

  //   expect(response.data?.newPost).toBeDefined();
  //   expect(response.data?.newPost.description).toBe("Un post pour le test")
  // })
})