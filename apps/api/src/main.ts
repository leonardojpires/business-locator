import { createApp } from "./app.js";
import { env } from "./config/env.config.js";

const server = createApp().listen(env.PORT, env.HOST, () => {
    console.info(`Business Locator API: http://${env.HOST}:${env.PORT}`)
});

server.on('error', (error) => {
    console.error('Failed to start API: ', error.message);
    process.exit(1);
});
