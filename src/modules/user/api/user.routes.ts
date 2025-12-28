import { Hono } from "hono";
import { UserRepo } from "@/modules/user/infrastructure/user.repo";
import { AddUserUC } from "@/modules/user/application/usecase/add-user.uc";
import { EditUserUC } from "@/modules/user/application/usecase/edit-user.uc";
import { RemoveUserUC } from "@/modules/user/application/usecase/remove-user.uc";
import { FindUserByIdUC } from "@/modules/user/application/usecase/find-user-by-id.uc";
import { FindAllUsersUC } from "@/modules/user/application/usecase/find-all-users.uc";
import { FindUserByProviderIdUC } from "@/modules/user/application/usecase/find-user-by-provider-id.uc";
import { UserController } from "@/modules/user/api/user.controller";
import { requireAdminAuth } from "@/shared/api/middlewares/clerk-require-auth";
import { CheckAdminAccessUC } from "@/modules/user/application/usecase/check-admin-access.uc";

export const userRoutes = new Hono();

const userRepo = new UserRepo();

const addUserUC  = new AddUserUC(userRepo);
const editUserUC  = new EditUserUC(userRepo);
const findUserByIdUC = new FindUserByIdUC(userRepo);
const findAllUsersUC = new FindAllUsersUC(userRepo);
const findUserByProviderIdUC = new FindUserByProviderIdUC(userRepo);
const removeUserUC  = new RemoveUserUC(userRepo);

const checkAdminAccessUC = new CheckAdminAccessUC(userRepo);

const userController = new UserController(
  addUserUC, editUserUC, findAllUsersUC, findUserByIdUC, findUserByProviderIdUC, removeUserUC
)

userRoutes.put("/:id", (c) => userController.editUser(c) )
userRoutes.get("/:id", (c) => userController.findUserById(c))
userRoutes.get("/providers/:id", (c) => userController.findUserByProviderId(c))

userRoutes.use('*', requireAdminAuth(checkAdminAccessUC));

userRoutes.post("/", (c) => userController.addUser(c))
userRoutes.get("/", (c) => userController.findAllUsers(c))
userRoutes.delete("/:id", (c) => userController.removeUser(c))

export default userRoutes