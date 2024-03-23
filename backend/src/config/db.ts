import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Post } from '../entities/post';
import * as dotenv from 'dotenv'
import { Commentary } from '../entities/commentary';

dotenv.config()

const database = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: 'clement',//process.env.DB_USER,
    password: 'Klapaucius972!',//process.env.DB_PASSWORD,
    database: 'blog',
    entities: ["src/entities/*.ts"],
    logging: true,
    synchronize: true
})

export default database;