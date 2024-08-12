import request from "supertest";
import server from "../src/server.js";
import { describe, expect, it } from "vitest";

describe("Server", () => {
	it("should respond to a basic request", async () => {
		const response = await request(server).get("/");
		expect(response.status).not.toBe(404); // Check that it's not 404, meaning the server is running
	});
});
