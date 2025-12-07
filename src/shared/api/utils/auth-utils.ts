import { getAuth } from "@hono/clerk-auth";
import { Context } from "hono";
import { UserAuthProviderRepo } from "@/modules/user/infrastructure/user-authProvider.repo";
import { ApiResponse } from "@/shared/api/utils/api-response";

const userAuthProviderRepo = new UserAuthProviderRepo()

export async function isCorrectUser(c: Context) {
    const auth = getAuth(c)
    const userId = c.req.param('userId')
    if(!auth?.userId) return null
    const user = await userAuthProviderRepo.findById(auth?.userId)
    if(user?.id !== userId) return c.json(ApiResponse('Unothorized to access this resource'), 401)
}