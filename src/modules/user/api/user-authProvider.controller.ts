import { getAuth } from "@hono/clerk-auth";
import { ApiResponse } from "@/shared/api/utils/api-response";
import { handelError } from "@/shared/api/utils/handel-error";
import { Context } from "hono";
import { GetUserByAuthProviderIdUC } from "@/modules/user/application/query/get-user-by-authProviderId.uc";

export class UserAuthProviderController {
    constructor(
        private getUserByIdUC: GetUserByAuthProviderIdUC,
    ) {}

    async getUserById(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth || !auth.userId) throw new Error("Unauthorized, not connected")
            const id = c.req.param("id")
            if(id !== auth.userId) throw new Error("Unauthorized to access this user")
            const user = await this.getUserByIdUC.execute({ authProviderId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error getting user"})
        }
    }
}