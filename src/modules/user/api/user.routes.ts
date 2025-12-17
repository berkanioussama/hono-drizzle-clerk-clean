import { Hono } from "hono";
import { UserRepo } from "@/modules/user/infrastructure/user.repo";
import { AddUserUC } from "@/modules/user/application/command/add-user.uc";
import { EditUserUC } from "@/modules/user/application/command/edit-user.uc";
import { RemoveUserUC } from "@/modules/user/application/command/remove-user.uc";
import { FindUserByIdUC } from "@/modules/user/application/query/find-user-by-id.uc";
import { FindAllUsersUC } from "@/modules/user/application/query/find-all-users.uc";
import { UserController } from "@/modules/user/api/user.controller";
import { zValidator } from "@hono/zod-validator";
import { addUserSchema, editUserSchema } from "@/modules/user/api/user.validator";

export const userRoutes = new Hono();

const userRepo = new UserRepo();

const addUserUC  = new AddUserUC(userRepo);
const editUserUC  = new EditUserUC(userRepo);
const findUserByIdUC = new FindUserByIdUC(userRepo);
const findAllUsersUC = new FindAllUsersUC(userRepo);
const removeUserUC  = new RemoveUserUC(userRepo);

const userController = new UserController(
  addUserUC, editUserUC, findAllUsersUC, findUserByIdUC, removeUserUC
)

userRoutes.post("/", zValidator('json', addUserSchema), (c) => userController.addUser(c))
userRoutes.get("/", (c) => userController.findAllUsers(c))
userRoutes.get("/:id", (c) => userController.findUserById(c))
userRoutes.put("/:id", zValidator('json', editUserSchema), (c) => userController.editUser(c))
userRoutes.delete("/:id", (c) => userController.removeUser(c))

export default userRoutes