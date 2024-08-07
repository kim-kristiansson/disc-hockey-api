import { Router, Request, Response } from "express";
import { getUsersCollection } from "../models/user";

const router = Router();

router.post("/add", async (req: Request, res: Response) => {
	const { userId, playlistId, trackUri, start, end } = req.body;
	const usersCollection = getUsersCollection();
	const user = await usersCollection.findOne({ spotifyId: userId });

	if (!user) {
		return res.status(404).send("User not found");
	}

	try {
		const segment = { start, end };

		await usersCollection.updateOne(
			{
				spotifyId: userId,
				"playlists.spotifyId": playlistId,
				"playlists.tracks.uri": trackUri,
			},
			{
				$push: {
					"playlists.$[playlist].tracks.$[track].segments": segment,
				},
			},
			{
				arrayFilters: [
					{ "playlist.spotifyId": playlistId },
					{ "track.uri": trackUri },
				],
			}
		);

		res.status(201).json(segment);
	} catch (error) {
		console.error("Error adding segment to track:", error);
		res.status(500).send("Error adding segment to track");
	}
});

export default router;
