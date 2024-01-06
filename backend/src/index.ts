import { ApolloServer } from "apollo-server";
import database from "./config/db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import * as dotenv from 'dotenv'

const port: number = 3000;

async function start(){
    dotenv.config()
    await database.initialize()

    const schema = await buildSchema({
        resolvers: [UserResolver],
        validate: { forbidUnknownValues: false }
    })

    const server = new ApolloServer({
        schema
    })

    try {
        const { url } = await server.listen({port});
        console.log(`Server listening on port ${url}`);
        
    } catch (error) {
        console.error(error);
    }
}

void start();