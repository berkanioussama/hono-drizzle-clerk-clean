import { Context } from "hono";
import { AddUserUC } from "@/modules/user/application/command/add-user.uc";
import { EditUserUC } from "@/modules/user/application/command/edit-user.uc";
import { FindUserByIdUC } from "@/modules/user/application/query/find-user-by-id.uc";
import { RemoveUserUC } from "@/modules/user/application/command/remove-user.uc";
import { FindAllUsersUC } from "@/modules/user/application/query/find-all-users.uc";
import { ApiResponse } from "@/shared/api/utils/api-response";
import { handelError } from "@/shared/api/utils/handel-error";
import { getAuth } from "@hono/clerk-auth";

export class UserController {
    constructor(
        private addUserUC : AddUserUC,
        private editUserUC : EditUserUC,
        private findAllUsersUC: FindAllUsersUC,
        private findUserByIdUC: FindUserByIdUC,
        private removeUserUC : RemoveUserUC
    ) {}

    async addUser(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const data = c.req.valid('json')
            const user = await this.addUserUC.execute({providerId: auth.userId, ...data})
            return c.json(ApiResponse(user), 201)
        } catch (error) {
            return handelError({c, error, message: "error creating user"})
        }
    }

    async findAllUsers(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const users = await this.findAllUsersUC.execute()
            return c.json(ApiResponse(users))
        } catch (error) {
            return handelError({c, error, message: "error getting users"})
        }
    }

    async findUserById(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth?.userId) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const id = c.req.param("id");
            const user = await this.findUserByIdUC.execute({ id, providerId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error getting user"})
        }
    }

    async editUser(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const id = c.req.param("id");
            const body = c.req.valid('json')
            const user = await this.editUserUC.execute({id, providerId: auth.userId, ...body})
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error updating user"})
        }
    }

    async removeUser(c: Context) {
        try {
            const auth = getAuth(c)
            if(!auth) return c.json(ApiResponse("Unauthorized, not connected"), 401)
            const id = c.req.param("id");
            await this.removeUserUC.execute({ id })
            return c.json(ApiResponse("User deleted"))
        } catch (error) {
            return handelError({c, error, message: "error deleting user"})
        }
    }
}