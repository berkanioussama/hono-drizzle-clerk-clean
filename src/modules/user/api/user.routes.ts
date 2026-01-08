import { Hono } from "hono";
import { UserRepo } from "../infrastructure/user.repo";
import { AddUserUC } from "../application/usecase/add-user.uc";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { RemoveUserUC } from "../application/usecase/remove-user.uc";
import { FindUserByIdUC } from "../application/usecase/find-user-by-id.uc";
import { FindAllUsersUC } from "../application/usecase/find-all-users.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { UserController } from "./user.controller";
import { requireAdminAuth } from "../../../shared/api/middlewares/auth.middleware";
import { AuthorizationService } from "../domain/user.service";

export const userRoutes = new Hono();

const userRepo = new UserRepo();

const addUserUC  = new AddUserUC(userRepo);
const editUserUC  = new EditUserUC(userRepo);
const findUserByIdUC = new FindUserByIdUC(userRepo);
const findAllUsersUC = new FindAllUsersUC(userRepo);
const findUserByProviderIdUC = new FindUserByProviderIdUC(userRepo);
const removeUserUC  = new RemoveUserUC(userRepo);

const authorizationService = new AuthorizationService(userRepo);

const userController = new UserController(
  addUserUC, editUserUC, findAllUsersUC, findUserByIdUC, findUserByProviderIdUC, removeUserUC
)

userRoutes.put("/:id", (c) => userController.editUser(c) )
userRoutes.get("/:id", (c) => userController.findUserById(c))
userRoutes.get("/providers/:id", (c) => userController.findUserByProviderId(c))

userRoutes.use('*', requireAdminAuth(authorizationService));

userRoutes.post("/", (c) => userController.addUser(c))
userRoutes.get("/", (c) => userController.findAllUsers(c))
userRoutes.delete("/:id", (c) => userController.removeUser(c))

export default userRoutes