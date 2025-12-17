import { getAuth } from "@hono/clerk-auth";
import { Context } from "hono";
import { UserProviderRepo } from "@/modules/user/infrastructure/user-provider.repo";
import { ApiResponse } from "@/shared/api/utils/api-response";

const userProviderRepo = new UserProviderRepo()

export async function isCorrectUser(c: Context) {
    const auth = getAuth(c)
    const userId = c.req.param('userId')
    if(!auth?.userId) return null
    const user = await userProviderRepo.findById(auth?.userId)
    if(user?.id !== userId) return c.json(ApiResponse('Unothorized to access this resource'), 401)
}