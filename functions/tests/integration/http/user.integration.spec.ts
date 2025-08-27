import "reflect-metadata"
import request from "supertest";
import app from "@/interfaces/app";


describe("User API - Integration", () => {
    it("POST /users debe crear un usuario", async () => {
        const res = await request(app)
            .post("/user")
            .send({ email: "test@example.com" });

        expect(res.status).toBe(201);
    });
});
