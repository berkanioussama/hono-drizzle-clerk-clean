import { Hono } from "hono";
import { UserRepo } from "../infrastructure/user.repo";
import { CreateUserUC } from "../application/command/create-user.uc";
import { UpdateUserUC } from "../application/command/update-user.uc";
import { DeleteUserUC } from "../application/command/delete-user.uc";
import { GetUserByIdUC } from "../application/query/get-user-by-id.uc";
import { GetAllUsersUC } from "../application/query/get-all-users.uc";
import { UserController } from "./user.controller";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "./user.validator";

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