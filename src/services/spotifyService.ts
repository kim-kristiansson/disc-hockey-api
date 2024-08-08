import axios from "axios";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;
const scopes = [
	"playlist-modify-public",
	"playlist-modify-private",
	"user-read-private",
	"user-read-email",
];

if (!clientId || !clientSecret || !redirectUri) {
	throw new Error("Missing environment variables for Spotify API");
}

export const getAuthorizeURL = (): string => {
	const state = generateRandomString(16);
	const scope = scopes.join(" ");

	return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(
		scope
	)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
};

export const getTokens = async (
	code: string
): Promise<{ accessToken: string; refreshToken: string }> => {
	const params = new URLSearchParams({
		grant_type: "authorization_code",
		code: code,
		redirect_uri: redirectUri!,
	});

	const response = await axios.post(
		"https://accounts.spotify.com/api/token",
		params,
		{
			headers: {
				Authorization:
					"Basic " +
					Buffer.from(clientId + ":" + clientSecret).toString(
						"base64"
					),
				"Content-Type": "application/x-www-form-urlencoded",
			},
		}
	);

	return {
		accessToken: response.data.access_token,
		refreshToken: response.data.refresh_token,
	};
};

export const getSpotifyUser = async (accessToken: string) => {
	const response = await axios.get("https://api.spotify.com/v1/me", {
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	});

	return response.data;
};

export const createPlaylist = async (
	accessToken: string,
	userId: string,
	name: string,
	description: string,
	isPublic: boolean
) => {
	const response = await axios.post(
		`https://api.spotify.com/v1/users/${userId}/playlists`,
		{
			name: name,
			description: description,
			public: isPublic,
		},
		{
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
		}
	);

	return response.data;
};

export const addTracksToPlaylist = async (
	accessToken: string,
	playlistId: string,
	trackUris: string[]
) => {
	const response = await axios.post(
		`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
		{
			uris: trackUris,
		},
		{
			headers: {
				Authorization: "Bearer " + accessToken,
				"Content-Type": "application/json",
			},
		}
	);

	return response.data;
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
