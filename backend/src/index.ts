import { ApolloServer } from "apollo-server";
import database from "./config/db";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import { PostResolver } from "./resolvers/post.resolver";
import { GraphQLError } from 'graphql'
import { getUser, verifyToken } from "./services/user.service";
import { CommentaryResolver } from "./resolvers/commentary.resolver";

const port: number = 3000;

async function start() {
    await database.initialize()

    const schema = await buildSchema({
        resolvers: [UserResolver, PostResolver, CommentaryResolver],
        validate: { forbidUnknownValues: false },
        authChecker: ({ context }, roles) => {
            try {
                const payload: any = verifyToken(context.token);
                const { email, userId } = payload;

                return true;
            } catch (error) {
                throw new GraphQLError('Vous n\'êtes pas authentifier', null, null, null, null, null,
                    {
                        code:
                            'UNAUTHENTICATED'
                    })
            }
        }
    })

    const server = new ApolloServer({
        schema,
        context: async ({ req }) => {
            if (
                req?.headers.authorization === undefined ||
                process.env.JWT_SECRET_KEY === undefined
            ) {
                return {};
            } else {
                try {
                    const bearer = req.headers.authorization.split("Bearer ")[1];
                    const payload: any = verifyToken(bearer);
                    const userFromDB = await getUser(payload.email);

                    return {
                        token: bearer,
                        user: userFromDB
                    };
                } catch (e) {
                    console.log(e);
                    return {};
                }
            }
        }
    })

    try {
        const { url } = await server.listen({ port });
        console.log(`Server listening on port ${url}`);

    } catch (error) {
        console.error(error);
    }
}

void start();