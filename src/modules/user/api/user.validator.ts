import { z } from "zod";
import { Role } from "../domain/user.entity";

export const UserSchema = z.object({
  id: z.string().min(2, { message: "ID must be at least 2 characters." }),
  providerId: z.string().min(2, { message: "Auth provider ID must be at least 2 characters." }),
  name: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z.email({ message: "Invalid email address." }),
  image: z.string(),
  role: z.enum([Role.USER, Role.ADMIN], { message: `Role must be either '${Role.USER}' or '${Role.ADMIN}'` }),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
})

/*-----*****-----*/

export const AddUserAdminSchema = UserSchema.omit({ id: true, role: true, createdAt: true, updatedAt: true });

/*-----*****-----*/

export const EditUserAdminSchema = UserSchema.omit({ id: true, role: true, createdAt: true, updatedAt: true });
export const EditUserSchema = UserSchema.omit({ role: true, createdAt: true, updatedAt: true });