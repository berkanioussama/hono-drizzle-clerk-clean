import { z } from "zod";

export const addUserSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
});

export const editUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.email().optional(),
});

export type AddUserRequestDTO = z.infer<typeof addUserSchema>;
export type EditUserRequestDTO = z.infer<typeof editUserSchema>;