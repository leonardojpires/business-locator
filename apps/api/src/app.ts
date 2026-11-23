import express, { type Request, type Response } from "express";
import helmet from "helmet";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

  app.get("/api/businesses", async (req: Request, res: Response) => {
    try {
      const files = (await readdir(storagePath))
        .filter((file) => file.endsWith(".json"))
        .sort();
      const businesses = await Promise.all(
        files.map(async (file) => {
          const content = await readFile(path.join(storagePath, file), "utf8");
          return JSON.parse(content);
        }),
      );

      return res.status(200).json({
        businesses,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Unable to read business storage", error);
      return res.status(500).json({
        error: "Unable to read business storage",
      });
    }
  });

  app.use((_req, res) =>
    res.status(404).json({ message: "Resource not found." }),
  );

  return app;
}
