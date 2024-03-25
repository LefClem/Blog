import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: 'clement',//process.env.DB_USER,
    password: 'Klapaucius972!',//process.env.DB_PASSWORD,
    database: 'blog',
    entities: ["src/entities/*.ts"],
    logging: false,
    synchronize: true
})

export default database;