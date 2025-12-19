import { z } from "zod";

export const AddUserSchema = z.object({
  providerId: z.string().min(1),
  name: z.string().min(1),
  email: z.email().min(1),
  image: z.string().min(1).optional(),
});

export const EditUserSchema = z.object({
  providerId: z.string().min(1),
  name: z.string().min(1).optional(),
  email: z.email().min(1).optional(),
  image: z.string().min(1).optional(),
});

export type AddUserRequestDTO = z.infer<typeof AddUserSchema>;
export type EditUserRequestDTO = z.infer<typeof EditUserSchema>;