import request from "supertest";
import express from "express";
import authRouter from "../src/routes/auth";

const app = express();
app.use("/auth", authRouter);

describe("GET /auth/login", () => {
	it("should redirect to Spotify authorization URL", async () => {
		const response = await request(app).get("/auth/login");
		expect(response.status).toBe(302);
		expect(response.header.location).toContain("accounts.spotify.com");
	});
});
