import express from "express";
import { connectToDatabase } from "./models/user";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import trackRouter from "./routes/track";

const app = express();
const port = process.env.PORT || 3000;

const mongoUri = "your_mongodb_connection_string";

app.use(express.json());

connectToDatabase(mongoUri)
	.then(() => {
		app.use("/auth", authRouter);
		app.use("/playlist", playlistRouter);
		app.use("/track", trackRouter);

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to the database", err);
	});
