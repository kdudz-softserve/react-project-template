import { z } from "zod";

export const userStatusSchema = z.enum(["active", "invited", "disabled"]);

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(["admin", "manager", "member"]),
  status: userStatusSchema,
  createdAt: z.string().datetime(),
});

export const createUserInputSchema = userSchema.pick({
  name: true,
  email: true,
  role: true,
});

export const updateUserInputSchema = createUserInputSchema.partial().extend({
  status: userStatusSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
export type UserStatus = z.infer<typeof userStatusSchema>;
export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;
