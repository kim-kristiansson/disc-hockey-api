import { Router } from "express";
import { getAuthorizeURL } from "../services/spotifyService";

const router = Router();

router.get("/login", (req, res) => {
	const authorizeURL = getAuthorizeURL();
	res.redirect(authorizeURL);
});

export default router;
