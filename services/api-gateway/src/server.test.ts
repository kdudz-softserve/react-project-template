import { describe, expect, it } from "vitest";
import { createServer } from "./server.js";

describe("api gateway", () => {
  it("responds to health checks", async () => {
    const app = createServer();
    const response = await app.inject({ method: "GET", url: "/health" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ ok: true });
  });

  it("lists users", async () => {
    const app = createServer();
    const response = await app.inject({ method: "GET", url: "/api/users" });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveLength(2);
  });

  it("returns validation errors for invalid user creation", async () => {
    const app = createServer();
    const response = await app.inject({
      method: "POST",
      url: "/api/users",
      payload: { name: "", email: "bad", role: "member" },
    });
    expect(response.statusCode).toBe(400);
    expect(response.json().error.code).toBe("validation_failed");
  });
});
