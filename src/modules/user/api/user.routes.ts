import { Hono } from "hono";
import { UserRepo } from "@/modules/user/infrastructure/user.repo";
import { CreateUserUC } from "@/modules/user/application/command/create-user.uc";
import { UpdateUserUC } from "@/modules/user/application/command/update-user.uc";
import { DeleteUserUC } from "@/modules/user/application/command/delete-user.uc";
import { GetUserByIdUC } from "@/modules/user/application/query/get-user-by-id.uc";
import { GetAllUsersUC } from "@/modules/user/application/query/get-all-users.uc";
import { UserController } from "@/modules/user/api/user.controller";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "@/modules/user/api/user.validator";

export const userRoutes = new Hono();

const userRepo = new UserRepo();

const createUserUC  = new CreateUserUC(userRepo);
const updateUserUC  = new UpdateUserUC(userRepo);
const deleteUserUC  = new DeleteUserUC(userRepo);
const getUserByIdUC = new GetUserByIdUC(userRepo);
const getAllUsersUC = new GetAllUsersUC(userRepo);

const userController = new UserController(
  createUserUC, getAllUsersUC, getUserByIdUC, updateUserUC, deleteUserUC
)

userRoutes.post("/", zValidator('json', createUserSchema), (c) => userController.createUser(c))
userRoutes.get("/", (c) => userController.getAllUsers(c))
userRoutes.get("/:id", (c) => userController.getUserById(c))
userRoutes.put("/:id", zValidator('json', updateUserSchema), (c) => userController.updateUser(c))
userRoutes.delete("/:id", (c) => userController.deleteUser(c))

export default userRoutes