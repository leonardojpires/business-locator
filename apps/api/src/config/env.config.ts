import "dotenv/config";

const nodeEnv = (process.env.NODE_ENV ?? 'development').trim();
const host = (process.env.HOST ?? '127.0.0.1').trim();
const port = Number((process.env.PORT ?? '3000').trim());
const dbHost = (process.env.DB_HOST ?? '127.0.0.1').trim();
const dbPort = Number((process.env.DB_PORT ?? '3306').trim());
const dbName = (process.env.DB_NAME ?? 'business-locator').trim();
const dbUser = (process.env.DB_USER ?? 'root').trim();
const dbPassword = (process.env.DB_PASSWORD ?? 'root').trim();

if (!['development', 'test', 'production'].includes(nodeEnv)) {
  throw new Error('NODE_ENV must be development, test, or production.');
}

if (host.length === 0) {
  throw new Error('HOST must not be empty.');
}
if (!Number.isInteger(port) || Number(port) < 1 || Number(port) > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

if (!dbHost || !dbName || !dbUser) {
  throw new Error('DB_HOST, DB_NAME, and DB_USER must not be empty.');
}

if (!Number.isInteger(dbPort) || Number(dbPort) < 1 || Number(dbPort) > 65535) {
  throw new Error('DB_PORT must be an integer between 1 and 65535.');
}

export const env = {
    NODE_ENV: nodeEnv,
    HOST: host,
    PORT: port,
    DB_HOST: dbHost,
    DB_PORT: dbPort,
    DB_NAME: dbName,
    DB_USER: dbUser,
    DB_PASSWORD: dbPassword,
}
