import express from "express";
import cors from "cors"; // Import the cors middleware
import { connectToDatabase } from "./models/user";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import trackRouter from "./routes/track";
import segmentRouter from "./routes/segment";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Use the cors middleware with specific configuration to allow credentials
app.use(
	cors({
		origin: "http://localhost:1234", // Replace with your frontend URL
		credentials: true,
	})
);
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || "";

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
	});
