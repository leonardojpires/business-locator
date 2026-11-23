import { createPool } from "mysql2";
import { databaseConfig } from "../../config/database.config.js";

export const pool = createPool({
    ...databaseConfig,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 100,
});
