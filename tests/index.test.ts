import { describe, test, expect } from "bun:test";
import supertest from "supertest";
import { app } from "@/index";

const request = supertest(app);

describe("Express Routes", () => {
    test("GET / should return 'Hello World'", async () => {
        const response = await request.get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello World");
    });

    test("GET /health should return health status", async () => {
        const response = await request.get("/health");
        expect(response.status).toBe(200);

        const data = response.body;
        expect(data).toHaveProperty("status");
        expect(data).toHaveProperty("timestamp");
        expect(data.status).toBe("healthy 🩺");
    });
}); 