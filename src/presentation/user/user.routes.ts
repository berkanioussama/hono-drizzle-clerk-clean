import { Hono } from "hono";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user-repository-implement";
import { CreateUserUseCase } from "../../application/user/use-cases/create-user-useCase";
import { UpdateUserUseCase } from "../../application/user/use-cases/update-user-useCase";
import { DeleteUserUseCase } from "../../application/user/use-cases/delete-user-useCase";
import { GetUserByIdUseCase } from "../../application/user/use-cases/get-user-by-id-useCase";
import { GetAllUsersUseCase } from "../../application/user/use-cases/get-all-users-useCase";
import { UserController } from "./user-controller";
import { zValidator } from "@hono/zod-validator";
import { createUserSchema, updateUserSchema } from "./user-validator";

export const userRoutes = new Hono();

const userRepository = new UserRepositoryImpl();

const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getAllUsersUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
)

userRoutes.post("/", zValidator('json', createUserSchema), (c) => userController.createUser(c))
userRoutes.get("/", (c) => userController.getAllUsers(c))
userRoutes.get("/:id", (c) => userController.getUserById(c))
userRoutes.put("/:id", zValidator('json', updateUserSchema), (c) => userController.updateUser(c))
userRoutes.delete("/:id", (c) => userController.deleteUser(c))

export default userRoutes