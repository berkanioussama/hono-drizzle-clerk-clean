import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { UserRepo } from "../../../modules/user/infrastructure/user.repo";
import { ApiResponse } from "./api-response";

const userRepo = new UserRepo()

export async function isCorrectUser(c: Context) {
    const auth = getAuth(c)
    const userId = c.req.param('userId')
    if(!auth?.userId) return null
    const user = await userRepo.findByProviderId(auth?.userId)
    if(user?.id !== userId) return c.json(ApiResponse('Unauthorized to access this resource'), 401)
}