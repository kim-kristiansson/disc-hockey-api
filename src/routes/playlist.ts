import { Router, Request, Response } from "express";
import { getUsersCollection } from "../models/user";
import { createPlaylist } from "../services/spotifyService";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
	const { userId, name, description, isPublic } = req.body;
	const usersCollection = getUsersCollection();
	const user = await usersCollection.findOne({ spotifyId: userId });

	if (!user) {
		return res.status(404).send("User not found");
	}

	try {
		const playlist = await createPlaylist(
			user.accessToken,
			userId,
			name,
			description,
			isPublic
		);

		const newPlaylist = {
			spotifyId: playlist.id,
			name: playlist.name,
			description: playlist.description,
			public: playlist.public,
		};

		await usersCollection.updateOne(
			{ spotifyId: userId },
			{ $push: { playlists: newPlaylist } }
		);

		res.status(201).json(newPlaylist);
	} catch (error) {
		console.error("Error creating playlist:", error);
		res.status(500).send("Error creating playlist");
	}
});

export default router;
