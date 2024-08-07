import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const spotifyApi = SpotifyApi.withClientCredentials(
	"your_client_id",
	"your_client_secret"
);

const redirectUri = "your_redirect_uri";
const clientId = "your_client_id";
const scopes = ["user-read-private", "user-read-email"];

export const getSpotifyApiClient = () => {
	return spotifyApi;
};

export const getAuthorizeURL = (): string => {
	const state = generateRandomString(16);
	const scope = scopes.join(" ");

	return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
};

const generateRandomString = (length: number): string => {
	let text = "";
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};
