import { MongoClient, Db, Collection } from "mongodb";

interface User {
	spotifyId: string;
	displayName: string;
	email: string;
	accessToken: string;
	refreshToken: string;
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
