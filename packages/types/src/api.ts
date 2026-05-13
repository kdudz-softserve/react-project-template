import { z } from "zod";

export const apiErrorCodeSchema = z.enum([
  "validation_failed",
  "not_found",
  "server_error",
]);

export const apiErrorEnvelopeSchema = z.object({
  error: z.object({
    code: apiErrorCodeSchema,
    message: z.string(),
    fields: z.record(z.string()).optional(),
    requestId: z.string(),
  }),
});

export type ApiErrorCode = z.infer<typeof apiErrorCodeSchema>;
export type ApiErrorEnvelope = z.infer<typeof apiErrorEnvelopeSchema>;
