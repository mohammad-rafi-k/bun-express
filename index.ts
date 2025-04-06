import express from "express";
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

// Only start the server if this file is run directly
if (import.meta.main) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}