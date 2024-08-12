import express from "express";
import dotenv from "dotenv";

dotenv.config();

const server = express();
const port = process.env.PORT || 3000;

server.get("/", (req, res) => {
	res.status(200).json({ status: "ok" });
});

server.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});

export default server;
