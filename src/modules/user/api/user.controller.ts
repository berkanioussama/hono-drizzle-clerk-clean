import { Context } from "hono";
import { CreateUserUC } from "../application/command/create-user.uc";
import { GetUserByIdUC } from "../application/query/get-user-by-id.uc";
import { UpdateUserUC } from "../application/command/update-user.uc";
import { DeleteUserUC } from "../application/command/delete-user.uc";
import { GetAllUsersUC } from "../application/query/get-all-users.uc";
import { ApiResponse } from "../../../shared/api/utils/api-response";
import { handelError } from "../../../shared/api/utils/handel-error";

export class UserController {
    constructor(
        private createUserUseCase : CreateUserUC,
        private getAllUsersUseCase: GetAllUsersUC,
        private getUserByIdUseCase: GetUserByIdUC,
        private updateUserUseCase : UpdateUserUC,
        private deleteUserUseCase : DeleteUserUC
    ) {}

    async createUser(c: Context) {
        try {
            const auth = c.get("auth");
            const data = c.req.valid('json')
            const user = await this.createUserUseCase.execute({authProviderId: auth.userId, ...data})
            return c.json(ApiResponse(user), 201)
        } catch (error) {
            return handelError({c, error, message: "error creating user"})
        }
    }

    async getAllUsers(c: Context) {
        try {
            const users = await this.getAllUsersUseCase.execute()
            return c.json(ApiResponse(users))
        } catch (error) {
            return handelError({c, error, message: "error getting users"})
        }
    }

    async getUserById(c: Context) {
        try {
            const auth = c.get("auth");
            const id = c.req.param("id");
            const user = await this.getUserByIdUseCase.execute({ id, authProviderId: auth.userId })
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error getting user"})
        }
    }

    async updateUser(c: Context) {
        try {
            const auth = c.get("auth");
            const id = c.req.param("id");
            const body = c.req.valid('json')
            const user = await this.updateUserUseCase.execute({id, authProviderId: auth.userId, ...body})
            return c.json(ApiResponse(user))
        } catch (error) {
            return handelError({c, error, message: "error updating user"})
        }
    }

    async deleteUser(c: Context) {
        try {
            const id = c.req.param("id");
            await this.deleteUserUseCase.execute({ id })
            return c.json(ApiResponse("User deleted"))
        } catch (error) {
            return handelError({c, error, message: "error deleting user"})
        }
    }
}