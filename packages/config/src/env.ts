import { z } from "zod";

export const appEnvSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default("http://localhost:4000"),
});

export type AppEnv = z.infer<typeof appEnvSchema>;

export function parseAppEnv(env: Record<string, string | undefined>): AppEnv {
  return appEnvSchema.parse(env);
}

export const serviceEnvSchema = z.object({
  API_PORT: z.coerce.number().int().positive().default(4000),
  API_HOST: z.string().default("0.0.0.0"),
});

export type ServiceEnv = z.infer<typeof serviceEnvSchema>;

export function parseServiceEnv(
  env: Record<string, string | undefined>,
): ServiceEnv {
  return serviceEnvSchema.parse(env);
}
