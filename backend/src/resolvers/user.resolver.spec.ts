// import { ApolloServer, gql } from "apollo-server"
// import createServer from "../config/server";

// describe("User resolver", () => {
//     let server: ApolloServer;

//     beforeAll(async () => {
//         server = await createServer();
//     })

//     // it("should create a new user", async () => {
//     //     const signUpQuery = gql`
//     //     mutation Mutation($password: String!, $email: String!) {
//     //         createUser(password: $password, email: $email) {
//     //           id
//     //           email
//     //           role
//     //         }
//     //       }
//     //     `
//     //     const response = await server.executeOperation({
//     //         query: signUpQuery,
//     //         variables: {
//     //             email: "",
//     //             password: ""
//     //         }
//     //     })                

//     //     expect(response).toBeDefined();

//     // })

//     it("should return a message when the auth is invalid", async () => {
//         const authQuery = gql`
//         mutation Mutation($password: String!, $email: String!) {
//             register(password: $password, email: $email)
//           }
//         `;

//         const response = await server.executeOperation({
//             query: authQuery,
//             variables: {
//                 email: "",
//                 password: "" 
//             }
//         })        

//         expect(response.errors).toBeDefined();
//         expect(response.errors?.[0].message).toBe("Invalid Auth");
//     })

//     // it("should return a token when you pass correct email and password", async () => {
//     //     const authQuery = gql`
//     //     mutation Mutation($password: String!, $email: String!) {
//     //         register(password: $password, email: $email)
//     //       }
//     //     `;

//     //     const response = await server.executeOperation({
//     //         query: authQuery,
//     //         variables: {
//     //             email: "test@mail.com",
//     //             password: "Test01" 
//     //         }
//     //     })        

//     //     console.log(response);
//     //     expect(response).toBeDefined();
//     //     expect(response.data?.register).toBeDefined();
//     // })
// })