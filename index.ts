import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8080;
export const app = express();

app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello World");
});

app.get("/health", (_, res) => {
    res.status(200).json({
        status: "healthy 🩺",
        timestamp: new Date().toISOString(),
    });
});

type RequestHandler = (req: Request, res: Response) => Promise<void>;

app.get("/proxy", (async (req: Request, res: Response) => {
    let url = req.query.url as string;
    if (!url) {
        url = "https://jsonplaceholder.typicode.com/posts/1";
    }
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
}) as RequestHandler);

// Only start the server if this file is run directly
if (import.meta.main) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}