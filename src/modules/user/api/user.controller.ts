import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { AddUserAdminUC } from "../application/usecase/add-user-admin.uc";
import { EditUserAdminUC } from "../application/usecase/edit-user-admin.uc";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { FindUserByIdAdminUC } from "../application/usecase/find-user-by-id-admin.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { RemoveUserAdminUC } from "../application/usecase/remove-user.uc";
import { FindAllUsersAdminUC } from "../application/usecase/find-all-users-admin.uc";
import { successResponse, errorResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { AddUserAdminSchema, EditUserAdminSchema, EditUserSchema } from "./user.validator";

export class UserController {
    constructor(
        private addUserAdminUC : AddUserAdminUC,
        private editUserAdminUC : EditUserAdminUC, private editUserUC : EditUserUC,
        private findAllUsersAdminUC: FindAllUsersAdminUC,
        private findUserByIdAdminUC: FindUserByIdAdminUC,
        private findUserByProviderIdUC: FindUserByProviderIdUC,
        private removeUserAdminUC : RemoveUserAdminUC
    ) {}

    async addUserAdmin(c: Context) {
        try {
            const body = AddUserAdminSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const user = await this.addUserAdminUC.execute(body.data)
            return successResponse(c, 201, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: creating user"})
        }
    }

    async editUserAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const body = EditUserAdminSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const user = await this.editUserAdminUC.execute({id, ...body.data})
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating user"})
        }
    }
    async editUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return errorResponse(c, 401, "Unauthorized, not connected")
            const body = EditUserSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const user = await this.editUserUC.execute(body.data)
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating user"})
        }
    }

    async findAllUsersAdmin(c: Context) {
        try {
            const users = await this.findAllUsersAdminUC.execute()
            return successResponse(c, 200, users)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting users"})
        }
    }

    async findUserByIdAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const user = await this.findUserByIdAdminUC.execute(id)
            if (!user) return errorResponse(c, 404, "User not found")
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }
    async findUserByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.findUserByProviderIdUC.execute({providerId: auth.userId })
            return successResponse(c, 200, user)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting user"})
        }
    }

    async removeUserAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            await this.removeUserAdminUC.execute(id)
            return successResponse(c, 200, "User deleted")
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting user"})
        }
    }
}