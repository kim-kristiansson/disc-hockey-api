import express from "express";
import { connectToDatabase } from "./models/user";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import trackRouter from "./routes/track";
import segmentRouter from "./routes/segment";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use the environment variable for the MongoDB connection string
const mongoUri = process.env.MONGODB_URI || "";

app.use(express.json());

connectToDatabase(mongoUri)
	.then(() => {
		app.use("/auth", authRouter);
		app.use("/playlist", playlistRouter);
		app.use("/track", trackRouter);
		app.use("/segment", segmentRouter);

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to the database", err);
		console.log(`MongoDB URI: ${mongoUri}`);
	});
