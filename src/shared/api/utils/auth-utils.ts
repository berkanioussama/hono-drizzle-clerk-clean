import { getAuth } from "@hono/clerk-auth";
import { Context } from "hono";
import { UserAuthProviderRepository } from "../../../modules/user/infrastructure/user-authProvider.repo";
import { ApiResponse } from "./api-response";

const userAuthProviderRepository = new UserAuthProviderRepository()

export async function isCorrectUser(c: Context) {
    const auth = getAuth(c)
    const userId = c.req.param('userId')
    if(!auth?.userId) return null
    const user = await userAuthProviderRepository.findByAuthProviderId(auth?.userId)
    if(user?.id !== userId) return c.json(ApiResponse('Unothorized to access this resource'), 401)
}