import express from "express";
import { MongoClient } from "mongodb";
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient("your_mongodb_connection_string");

app.use("/auth", authRouter);

client
	.connect()
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
