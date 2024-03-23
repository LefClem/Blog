import { ApolloServer, gql } from "apollo-server";
import createServer from "../config/server";

const tokenContext: {token?: string} = {};

describe("User resolver", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        server = await createServer(() => tokenContext);
    })

    it("should return an error when you try to create a new user with existing mail", async () => {
        const userCreateMutation = gql`
        mutation CreateUser($password: String!, $email: String!) {
            createUser(password: $password, email: $email) {
              id
              email
              role
            }
          }
        `;

        let response = await server.executeOperation({
            query: userCreateMutation,
            variables: {
                email: "clem@mail.com",
                password: "test1234"
            }
        })        

        expect(response.errors).toBeDefined();
    })
})