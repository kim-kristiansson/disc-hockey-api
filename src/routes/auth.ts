import { Router, Request, Response } from "express";
import {
	getAuthorizeURL,
	getTokens,
	getSpotifyUser,
} from "../services/spotifyService";
import { getUsersCollection } from "../models/user";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
	const authorizeURL = getAuthorizeURL();
	res.redirect(authorizeURL);
});

router.get("/callback", async (req: Request, res: Response) => {
	const { code } = req.query;

	try {
		const { accessToken, refreshToken } = await getTokens(code as string);
		const me = await getSpotifyUser(accessToken);
		const usersCollection = getUsersCollection();

		const user = {
			spotifyId: me.id,
			displayName: me.display_name,
			email: me.email,
			accessToken: accessToken,
			refreshToken: refreshToken,
		};

		await usersCollection.updateOne(
			{ spotifyId: user.spotifyId },
			{ $set: user },
			{ upsert: true }
		);

		res.send("Login successful!");
	} catch (error) {
		console.error("Error getting Tokens:", error);
		res.status(500).send("Error during authentication");
	}
});

export default router;
