import request from "supertest";
import express from "express";
import trackRouter from "../routes/track";
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
	app.use("/track", trackRouter);
});

afterAll(async () => {
	await mongoServer.stop();
});

describe("POST /track/add", () => {
	it("should add tracks to the playlist and save them in the database", async () => {
		const usersCollection = getUsersCollection();
		await usersCollection.insertOne({
			spotifyId: "test_spotify_id",
			displayName: "Test User",
			email: "test@example.com",
			accessToken: "test_access_token",
			refreshToken: "test_refresh_token",
			playlists: [
				{
					spotifyId: "test_playlist_id",
					name: "Test Playlist",
					description: "Test Description",
					public: false,
					tracks: [],
				},
			],
		});

		jest.spyOn(
			require("../services/spotifyService"),
			"addTracksToPlaylist"
		).mockResolvedValue({
			snapshot_id: "test_snapshot_id",
		});

		const response = await request(app)
			.post("/track/add")
			.send({
				userId: "test_spotify_id",
				playlistId: "test_playlist_id",
				trackUris: [
					"spotify:track:test_track_1",
					"spotify:track:test_track_2",
				],
			});

		expect(response.status).toBe(201);
		expect(response.body.snapshot_id).toBe("test_snapshot_id");

		const user = await usersCollection.findOne({
			spotifyId: "test_spotify_id",
		});
		expect(user).not.toBeNull();
		const playlist = user?.playlists?.find(
			(p) => p.spotifyId === "test_playlist_id"
		);
		expect(playlist).not.toBeNull();
		expect(playlist?.tracks).toHaveLength(2);
		expect(playlist?.tracks?.[0].uri).toBe("spotify:track:test_track_1");
		expect(playlist?.tracks?.[1].uri).toBe("spotify:track:test_track_2");
	});
});
