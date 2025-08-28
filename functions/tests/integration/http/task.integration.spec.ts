import request from "supertest";
import app from "../../../src/interfaces/app";
import {JwtService} from "@/infrastructure/security/jwt.service";

let token: string;

beforeAll(async () => {
  const jwtService = new JwtService();
  token = jwtService.sign({userId: "1"});
});

describe("Task API - Integration", () => {
  it("POST /task debe crear una tarea", async () => {
    const res = await request(app)
      .post("/task")
      .set("Authorization", `Bearer ${token}`)
      .send({
        "userId": "100",
        "title": "tarea",
        "description": "Completar el ejercicio",
        "isCompleted": true,
      });

    expect(res.body.status).toBe("success");
  });
});
