import { Hono } from "hono";
import { UserRepoImpl } from "../infrastructure/user-repo.impl";
import { AddUserAdminUC } from "../application/usecase/add-user-admin.uc";
import { EditUserAdminUC } from "../application/usecase/edit-user-admin.uc";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { RemoveUserAdminUC } from "../application/usecase/remove-user.uc";
import { FindUserByIdAdminUC } from "../application/usecase/find-user-by-id-admin.uc";
import { FindAllUsersAdminUC } from "../application/usecase/find-all-users-admin.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { UserController } from "./user.controller";
import { requireAdminAuth } from "../../../shared/api/middlewares/auth.middleware";
import { AuthService } from "../application/service/auth.service";

export const userRoutes = new Hono();
export const userRoutesAdmin = new Hono();

const userRepo = new UserRepoImpl();

const addUserAdminUC  = new AddUserAdminUC(userRepo);
const editUserAdminUC  = new EditUserAdminUC(userRepo);
const editUserUC  = new EditUserUC(userRepo);
const findAllUsersAdminUC = new FindAllUsersAdminUC(userRepo);
const findUserByIdAdminUC = new FindUserByIdAdminUC(userRepo);
const findUserByProviderIdUC = new FindUserByProviderIdUC(userRepo);
const removeUserAdminUC  = new RemoveUserAdminUC(userRepo);

const authService = new AuthService(userRepo);

const userController = new UserController(
  addUserAdminUC,
  editUserAdminUC, editUserUC,
  findAllUsersAdminUC, 
  findUserByIdAdminUC, 
  findUserByProviderIdUC, 
  removeUserAdminUC
)

userRoutes.put("/:id", (c) => userController.editUser(c) )
userRoutes.get("/providers/:id", (c) => userController.findUserByProviderId(c))

userRoutesAdmin.use('*', requireAdminAuth(authService));

userRoutesAdmin.post("/", (c) => userController.addUserAdmin(c))
userRoutesAdmin.put("/:id", (c) => userController.editUserAdmin(c) )
userRoutesAdmin.get("/", (c) => userController.findAllUsersAdmin(c))
userRoutesAdmin.get("/:id", (c) => userController.findUserByIdAdmin(c))
userRoutesAdmin.delete("/:id", (c) => userController.removeUserAdmin(c))

export default userRoutes