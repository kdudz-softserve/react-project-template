import { parseServiceEnv } from "@template/config";
import { createServer } from "./server.js";

const env = parseServiceEnv(process.env);
const server = createServer();

await server.listen({ host: env.API_HOST, port: env.API_PORT });
