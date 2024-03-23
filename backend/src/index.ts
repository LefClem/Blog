import * as dotenv from 'dotenv';
import createServer from "./config/server";

const port: number = 3000;

async function start() {
    const server = await createServer();

    try {
        const { url } = await server.listen({ port });
        console.log(`Server listening on port ${url}`);

    } catch (error) {
        console.error(error);
    }
}

void start();