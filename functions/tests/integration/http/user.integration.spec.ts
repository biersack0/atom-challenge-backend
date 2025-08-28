import request from "supertest";
import app from "../../../src/interfaces/app";

describe("User API - Integration", () => {
    it("POST /users debe crear un usuario", async () => {
        const email = "test@example.com"
        const res = await request(app)
            .post("/user")
            .send({ email: email });

        expect(res.status).toBe(201);
        expect(res.body.status).toBe("success");
        expect(res.body.data.success).toBe(true);
        expect(res.body.data.data.email).toBe(email);
    });

    it("POST /user debe validar email requerido", async () => {
        const res = await request(app)
            .post("/user")
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it("POST /user debe validar formato de email", async () => {
        const res = await request(app)
            .post("/user")
            .send({ email: "invalid-email" });

        expect(res.status).toBe(400);
        expect(res.body.errors).toBeDefined();
    });

    it("POST /user/validate debe validar que usuario no exista", async () => {
        const res = await request(app)
            .post("/user/validate")
            .send({ email: "test@example.com" });

        expect(res.status).toBe(404);
        expect(res.body.status).toBe("error");
    });

    it("POST /user/validate debe validar que usuario exista", async () => {
        const res = await request(app)
            .post("/user/validate")
            .send({ email: "test100@example.com" });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("success");
    });
});
