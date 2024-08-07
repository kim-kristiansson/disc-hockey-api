import request from "supertest";
import express from "express";
import authRouter from "../routes/auth";
import { connectToDatabase, getUsersCollection } from "../models/user";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let app: express.Express;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await connectToDatabase(uri);

	app = express();
	app.use("/auth", authRouter);
});

afterAll(async () => {
	await mongoServer.stop();
});

describe("GET /auth/callback", () => {
	it("should store user in the database", async () => {
		const code = "test_code";

		// Mock the Spotify API calls
		jest.spyOn(
			require("../services/spotifyService"),
			"getTokens"
		).mockResolvedValue({
			accessToken: "test_access_token",
			refreshToken: "test_refresh_token",
		});
		jest.spyOn(
			require("../services/spotifyService"),
			"getSpotifyUser"
		).mockResolvedValue({
			id: "test_spotify_id",
			display_name: "Test User",
			email: "test@example.com",
		});

		const response = await request(app)
			.get("/auth/callback")
			.query({ code });
		expect(response.status).toBe(200);
		expect(response.text).toBe("Login successful!");

		const usersCollection = getUsersCollection();
		const user = await usersCollection.findOne({
			spotifyId: "test_spotify_id",
		});
		expect(user).not.toBeNull();
		expect(user?.displayName).toBe("Test User");
		expect(user?.email).toBe("test@example.com");
		expect(user?.accessToken).toBe("test_access_token");
		expect(user?.refreshToken).toBe("test_refresh_token");
	});
});
