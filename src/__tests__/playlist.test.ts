import request from "supertest";
import express from "express";
import playlistRouter from "../routes/playlist";
import { connectToDatabase, getUsersCollection } from "../models/user";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;
let app: express.Express;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	await connectToDatabase(uri);

	app = express();
	app.use(express.json());
	app.use("/playlist", playlistRouter);
});

afterAll(async () => {
	await mongoServer.stop();
});

describe("POST /playlist/create", () => {
	it("should create a new playlist for the user and save it in the database", async () => {
		const usersCollection = getUsersCollection();
		await usersCollection.insertOne({
			spotifyId: "test_spotify_id",
			displayName: "Test User",
			email: "test@example.com",
			accessToken: "test_access_token",
			refreshToken: "test_refresh_token",
		});

		jest.spyOn(
			require("../services/spotifyService"),
			"createPlaylist"
		).mockResolvedValue({
			id: "test_playlist_id",
			name: "Test Playlist",
			description: "Test Description",
			public: false,
		});

		const response = await request(app).post("/playlist/create").send({
			userId: "test_spotify_id",
			name: "Test Playlist",
			description: "Test Description",
			isPublic: false,
		});

		expect(response.status).toBe(201);
		expect(response.body.spotifyId).toBe("test_playlist_id");
		expect(response.body.name).toBe("Test Playlist");

		const user = await usersCollection.findOne({
			spotifyId: "test_spotify_id",
		});
		expect(user).not.toBeNull();
		expect(user?.playlists).toHaveLength(1);
		expect(user?.playlists?.[0].name).toBe("Test Playlist");
	});
});
