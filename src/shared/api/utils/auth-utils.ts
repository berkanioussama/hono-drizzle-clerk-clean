import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { UserRepoImpl } from "../../../modules/user/infrastructure/user.repo.impl";
import { errorResponse } from "./api-response";

const userRepo = new UserRepoImpl()

export async function isCorrectUser(c: Context) {
    const auth = getAuth(c)
    const userId = c.req.param('userId')
    if(!auth?.userId) return null
    const user = await userRepo.findByProviderId(auth?.userId)
    if(user?.id !== userId) return errorResponse(c, 401, 'Unauthorized to access this resource');
}