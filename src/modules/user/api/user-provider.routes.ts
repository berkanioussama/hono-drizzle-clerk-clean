import { Hono } from "hono";
import { UserProviderRepo } from "@/modules/user/infrastructure/user-provider.repo";
import { FindUserByProviderIdUC } from "@/modules/user/application/query/find-user-by-provider-id.uc";
import { UserProviderController } from "@/modules/user/api/user-provider.controller";

export const userProviderRoutes = new Hono();

const userProviderRepo = new UserProviderRepo();
const getUserByProviderIdUC = new FindUserByProviderIdUC(userProviderRepo);
const userProviderController = new UserProviderController(getUserByProviderIdUC);

userProviderRoutes.get("/:id", (c) => userProviderController.getUserById(c));

export default userProviderRoutes;