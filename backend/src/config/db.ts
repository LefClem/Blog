import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Post } from '../entities/post';
import * as dotenv from 'dotenv'

dotenv.config()

const database = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "blog",
    entities: [User, Post],
    logging: true,
    synchronize: true
})
console.log(database);

export default database;