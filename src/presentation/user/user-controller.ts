import { Context } from "hono";
import { CreateUserUseCase } from "../../application/user/use-cases/create-user-useCase";
import { GetUserByIdUseCase } from "../../application/user/use-cases/get-user-by-id-useCase";
import { UpdateUserUseCase } from "../../application/user/use-cases/update-user-useCase";
import { DeleteUserUseCase } from "../../application/user/use-cases/delete-user-useCase";
import { GetAllUsersUseCase } from "../../application/user/use-cases/get-all-users-useCase";

export class UserController {
    constructor(
        private createUserUseCase: CreateUserUseCase,
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getUserByIdUseCase: GetUserByIdUseCase,
        private updateUserUseCase: UpdateUserUseCase,
        private deleteUserUseCase: DeleteUserUseCase
    ) {}

    async createUser(c: Context) {
        const data = c.req.valid('json')
        const user = await this.createUserUseCase.execute(data)
        return c.json(user, 201)
    }

    async getAllUsers(c: Context) {
        const users = await this.getAllUsersUseCase.execute()
        return c.json(users)
    }

    async getUserById(c: Context) {
        const id = c.req.param("id");
        const user = await this.getUserByIdUseCase.execute({ id })
        return c.json(user)
    }

    async updateUser(c: Context) {
        const id = c.req.param("id");
        const body = c.req.valid('json')
        const user = await this.updateUserUseCase.execute({id, ...body})

        return c.json(user)
    }

    async deleteUser(c: Context) {
        const id = c.req.param("id");
        await this.deleteUserUseCase.execute({ id })
        return c.json({ message: "User deleted" })
    }
}