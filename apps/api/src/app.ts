import express, { type Request, type Response } from "express";
import helmet from "helmet";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crawlBusinessRoute from "./presentation/http/routes/crawl-business.routes.js";

export function createApp() {
  const app = express();
  const storagePath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../storage/datasets/default",
  );
  const publicPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../web/public",
  );

  app.use(helmet());
  // TODO: limit JSON body size: app.use(express.json({ limit: "1mb" }));
  app.use(express.json());
  app.use(express.static(publicPath));

  app.get("/health", (_req: Request, res: Response) => res.json({ status: "ok" }), );

  app.use("/api/crawl", crawlBusinessRoute);

  app.use((_req, res) =>
    res.status(404).json({ message: "Resource not found." }),
  );

  return app;
}
