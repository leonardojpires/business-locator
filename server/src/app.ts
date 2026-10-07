import express, { type Request, type Response } from "express";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: 'ok'
    });
});

export default app;
