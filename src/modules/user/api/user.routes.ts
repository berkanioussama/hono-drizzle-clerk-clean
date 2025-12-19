import { Hono } from "hono";
import { UserRepo } from "@/modules/user/infrastructure/user.repo";
import { AddUserUC } from "@/modules/user/application/command/add-user.uc";
import { EditUserUC } from "@/modules/user/application/command/edit-user.uc";
import { RemoveUserUC } from "@/modules/user/application/command/remove-user.uc";
import { FindUserByIdUC } from "@/modules/user/application/query/find-user-by-id.uc";
import { FindAllUsersUC } from "@/modules/user/application/query/find-all-users.uc";
import { UserController } from "@/modules/user/api/user.controller";
import { zValidator } from "@hono/zod-validator";
import { AddUserSchema, EditUserSchema } from "@/modules/user/api/user.validator";
import { requireAdminAuth } from "@/shared/api/middlewares/clerk-require-auth";
import { CheckAdminAccessUC } from "@/modules/user/application/query/check-admin-access.uc";
import { UserProviderRepo } from "@/modules/user/infrastructure/user-provider.repo";

export const userRoutes = new Hono();

const userRepo = new UserRepo();
const userProviderRepo = new UserProviderRepo()

const addUserUC  = new AddUserUC(userRepo);
const editUserUC  = new EditUserUC(userRepo);
const findUserByIdUC = new FindUserByIdUC(userRepo);
const findAllUsersUC = new FindAllUsersUC(userRepo);
const removeUserUC  = new RemoveUserUC(userRepo);

const checkAdminAccessUC = new CheckAdminAccessUC(userProviderRepo);

const userController = new UserController(
  addUserUC, editUserUC, findAllUsersUC, findUserByIdUC, removeUserUC
)

userRoutes.use('*', requireAdminAuth(checkAdminAccessUC));

userRoutes.post("/", zValidator('json', AddUserSchema), (c) => userController.addUser(c))
userRoutes.get("/", (c) => userController.findAllUsers(c))
userRoutes.get("/:id", (c) => userController.findUserById(c))
userRoutes.put("/:id", zValidator('json', EditUserSchema), (c) => userController.editUser(c))
userRoutes.delete("/:id", (c) => userController.removeUser(c))

export default userRoutes