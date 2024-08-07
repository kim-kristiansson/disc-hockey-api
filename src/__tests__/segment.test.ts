import request from "supertest";
import express from "express";
import segmentRouter from "../routes/segment";
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
	app.use("/segment", segmentRouter);
});

afterAll(async () => {
	await mongoServer.stop();
});

describe("POST /segment/add", () => {
	it("should add a segment to a track and save it in the database", async () => {
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
					tracks: [
						{
							uri: "spotify:track:test_track_1",
							name: "Test Track 1",
							artist: "Test Artist",
							album: "Test Album",
							segments: [],
						},
					],
				},
			],
		});

		const response = await request(app).post("/segment/add").send({
			userId: "test_spotify_id",
			playlistId: "test_playlist_id",
			trackUri: "spotify:track:test_track_1",
			start: 30,
			end: 60,
		});

		expect(response.status).toBe(201);
		expect(response.body.start).toBe(30);
		expect(response.body.end).toBe(60);

		const user = await usersCollection.findOne({
			spotifyId: "test_spotify_id",
		});
		expect(user).not.toBeNull();
		const playlist = user?.playlists?.find(
			(p) => p.spotifyId === "test_playlist_id"
		);
		expect(playlist).not.toBeNull();
		const track = playlist?.tracks?.find(
			(t) => t.uri === "spotify:track:test_track_1"
		);
		expect(track).not.toBeNull();
		expect(track?.segments).toHaveLength(1);
		expect(track?.segments?.[0].start).toBe(30);
		expect(track?.segments?.[0].end).toBe(60);
	});
});
