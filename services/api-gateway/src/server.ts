import cors from "@fastify/cors";
import {
  createUserInputSchema,
  updateUserInputSchema,
  type ApiErrorEnvelope,
} from "@template/types";
import Fastify from "fastify";
import { ZodError } from "zod";
import { createUsersStore } from "./usersStore.js";

function errorEnvelope(
  code: ApiErrorEnvelope["error"]["code"],
  message: string,
  requestId: string,
  fields?: Record<string, string>,
): ApiErrorEnvelope {
  return { error: { code, message, requestId, fields } };
}

function zodFields(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path.join("."), issue.message]),
  );
}

export function createServer() {
  const app = Fastify({ logger: true });
  const users = createUsersStore();

  app.register(cors, { origin: true });

  app.get("/health", async () => ({ ok: true }));

  app.get("/api/users", async () => users.list());

  app.get("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const user = users.get(id);
    if (!user) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return user;
  });

  app.post("/api/users", async (request, reply) => {
    const parsed = createUserInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send(
          errorEnvelope(
            "validation_failed",
            "Some fields need attention.",
            request.id,
            zodFields(parsed.error),
          ),
        );
    }
    return reply.code(201).send(users.create(parsed.data));
  });

  app.patch("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parsed = updateUserInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply
        .code(400)
        .send(
          errorEnvelope(
            "validation_failed",
            "Some fields need attention.",
            request.id,
            zodFields(parsed.error),
          ),
        );
    }
    const user = users.update(id, parsed.data);
    if (!user) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return user;
  });

  app.delete("/api/users/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    if (!users.delete(id)) {
      return reply
        .code(404)
        .send(errorEnvelope("not_found", "User not found.", request.id));
    }
    return { ok: true };
  });

  return app;
}
