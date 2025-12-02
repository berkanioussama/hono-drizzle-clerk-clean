import { Hono } from "hono";
import { UserRepository } from "../infrastructure/user.repository";
import { CreateUserUseCase } from "../application/commands/create-user.usecase";
import { UpdateUserUseCase } from "../application/commands/update-user.usecase";
import { DeleteUserUseCase } from "../application/commands/delete-user.usecase";
import { GetUserByIdUseCase } from "../application/queries/get-user-by-id.usecase";
import { GetAllUsersUseCase } from "../application/queries/get-all-users.usecase";
import { UserController } from "./user.controller";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "./user.validator";

export const userRoutes = new Hono();

const userRepository = new UserRepository();

const createUserUseCase  = new CreateUserUseCase(userRepository);
const updateUserUseCase  = new UpdateUserUseCase(userRepository);
const deleteUserUseCase  = new DeleteUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

const userController = new UserController(
  createUserUseCase, getAllUsersUseCase, getUserByIdUseCase, updateUserUseCase, deleteUserUseCase
)

userRoutes.post("/", zValidator('json', createUserSchema), (c) => userController.createUser(c))
userRoutes.get("/", (c) => userController.getAllUsers(c))
userRoutes.get("/:id", (c) => userController.getUserById(c))
userRoutes.put("/:id", zValidator('json', updateUserSchema), (c) => userController.updateUser(c))
userRoutes.delete("/:id", (c) => userController.deleteUser(c))

export default userRoutes