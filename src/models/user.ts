import { MongoClient, Db, Collection } from "mongodb";

interface Segment {
	start: number;
	end: number;
}

interface Track {
	uri: string;
	name: string;
	artist: string;
	album: string;
	segments?: Segment[];
}

interface Playlist {
	spotifyId: string;
	name: string;
	description: string;
	public: boolean;
	tracks?: Track[];
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
