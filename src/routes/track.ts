import { Router, Request, Response } from "express";
import { getUsersCollection } from "../models/user";
import { addTracksToPlaylist } from "../services/spotifyService";

const router = Router();

router.post("/add", async (req: Request, res: Response) => {
	const { userId, playlistId, trackUris } = req.body;
	const usersCollection = getUsersCollection();
	const user = await usersCollection.findOne({ spotifyId: userId });

	if (!user) {
		return res.status(404).send("User not found");
	}

	try {
		const result = await addTracksToPlaylist(
			user.accessToken,
			playlistId,
			trackUris
		);

		const tracks = trackUris.map((uri: string) => {
			return {
				uri: uri,
				name: "", // Ideally, you'd retrieve and store the name, artist, and album from Spotify API
				artist: "",
				album: "",
			};
		});

		await usersCollection.updateOne(
			{ spotifyId: userId, "playlists.spotifyId": playlistId },
			{ $push: { "playlists.$.tracks": { $each: tracks } } }
		);

		res.status(201).json(result);
	} catch (error) {
		console.error("Error adding tracks to playlist:", error);
		res.status(500).send("Error adding tracks to playlist");
	}
});

export default router;
