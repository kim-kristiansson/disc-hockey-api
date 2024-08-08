import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Ensure this is called before any other imports

import { connectToDatabase } from "./models/user";
import authRouter from "./routes/auth";
import playlistRouter from "./routes/playlist";
import trackRouter from "./routes/track";
import segmentRouter from "./routes/segment";

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: "http://localhost:1234",
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
