import { Hono } from "hono";
import { UserAuthProviderRepo } from "@/modules/user/infrastructure/user-authProvider.repo";
import { GetUserByAuthProviderIdUC } from "@/modules/user/application/query/get-user-by-authProviderId.uc";
import { UserAuthProviderController } from "@/modules/user/api/user-authProvider.controller";

export const userAuthProviderRoutes = new Hono();

const userAuthProviderRepo = new UserAuthProviderRepo();
const getUserByAuthProviderIdUC = new GetUserByAuthProviderIdUC(userAuthProviderRepo);
const userAuthProviderController = new UserAuthProviderController(getUserByAuthProviderIdUC);

userAuthProviderRoutes.get("/:id", (c) => userAuthProviderController.getUserById(c));

export default userAuthProviderRoutes;