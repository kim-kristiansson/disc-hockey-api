import express from "express";
import { MongoClient } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;

const client = new MongoClient("your_mongodb_connection_string");

app.get("/", (req, res) => {
	res.send("Hello World!");
});

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
