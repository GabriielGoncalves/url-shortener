import "reflect-metadata";
import 'dotenv/config';
import { DataSource } from "typeorm";

export default new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.ts'],
    migrations: ['src/database/migrations/*.ts']
});