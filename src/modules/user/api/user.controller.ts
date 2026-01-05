import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { AddUserUC } from "../application/usecase/add-user.uc";
import { EditUserUC } from "../application/usecase/edit-user.uc";
import { FindUserByIdUC } from "../application/usecase/find-user-by-id.uc";
import { FindUserByProviderIdUC } from "../application/usecase/find-user-by-provider-id.uc";
import { RemoveUserUC } from "../application/usecase/remove-user.uc";
import { FindAllUsersUC } from "../application/usecase/find-all-users.uc";
import { ApiResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { AddUserSchema, EditUserSchema } from "./user.validator";

export class UserController {
    constructor(
        private addUserUC : AddUserUC,
        private editUserUC : EditUserUC,
        private findAllUsersUC: FindAllUsersUC,
        private findUserByIdUC: FindUserByIdUC,
        private findUserByProviderIdUC: FindUserByProviderIdUC,
        private removeUserUC : RemoveUserUC
    ) {}

    async addUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const body = AddUserSchema.safeParse(await c.req.json())
            if(!body.success) return c.json(ApiResponse("Invalid request data"))
            const user = await this.addUserUC.execute(body.data)
            return c.json(ApiResponse(user), 201)
        } catch (error) {
            return errorHandler({c, error, message: "server error creating user"})
        }
    }
    async editUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const body = EditUserSchema.safeParse(await c.req.json())
            if(!body.success) return c.json(ApiResponse("Invalid request data"))
            const user = await this.editUserUC.execute(body.data)
            return c.json(ApiResponse(user))
        } catch (error) {
            return errorHandler({c, error, message: "server error updating user"})
        }
    }

    async findAllUsers(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const users = await this.findAllUsersUC.execute()
            return c.json(ApiResponse(users))
        } catch (error) {
            return errorHandler({c, error, message: "server error getting users"})
        }
    }

    async findUserById(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const id = c.req.param("id");
            const user = await this.findUserByIdUC.execute({ id, providerId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return errorHandler({c, error, message: "server error getting user"})
        }
    }

    async findUserByProviderId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const user = await this.findUserByProviderIdUC.execute({providerId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return errorHandler({c, error, message: "server error getting user"})
        }
    }

    async removeUser(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const id = c.req.param("id");
            await this.removeUserUC.execute({ id })
            return c.json(ApiResponse("User deleted"))
        } catch (error) {
            return errorHandler({c, error, message: "server error deleting user"})
        }
    }
}