import { ApolloServer, gql } from "apollo-server"
import createServer from "../config/server";

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

})