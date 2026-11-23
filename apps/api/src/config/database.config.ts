import { env } from "./env.config.js";

export const databaseConfig = {
    host: env.DB_HOST,
    port: Number(env.DB_PORT),
    user: env.DB_PORT,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
}