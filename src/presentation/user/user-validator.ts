import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
});

export type CreateUserRequestDTO = z.infer<typeof createUserSchema>;
export type UpdateUserRequestDTO = z.infer<typeof updateUserSchema>;