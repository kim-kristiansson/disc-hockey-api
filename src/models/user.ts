import { MongoClient, Db, Collection } from "mongodb";

interface Playlist {
	spotifyId: string;
	name: string;
	description: string;
	public: boolean;
}

interface User {
	spotifyId: string;
	displayName: string;
	email: string;
	accessToken: string;
	refreshToken: string;
	playlists?: Playlist[];
}

let db: Db;
let usersCollection: Collection<User>;

export const connectToDatabase = async (uri: string) => {
	const client = new MongoClient(uri);
	await client.connect();
	db = client.db();
	usersCollection = db.collection<User>("users");
};

export const getUsersCollection = (): Collection<User> => {
	return usersCollection;
};
