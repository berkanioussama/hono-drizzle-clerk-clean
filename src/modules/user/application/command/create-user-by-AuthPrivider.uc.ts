import { User } from "../../domain/user.entity"
import { IUserAuthProviderRepo } from "../../domain/IUser-authProvider-repo"
import { CreateUserInputDTO } from "../dto/user-input.dto"

export class CreateUserByAuthProviderIdUC {
  constructor(private userAuthProviderRepo: IUserAuthProviderRepo) {}

  async execute(input: CreateUserInputDTO) {

    const existingUser = await this.userAuthProviderRepo.findById(input.authProviderId)
    if (existingUser) throw new Error('User already exists')

    if (!input.name || input.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters.')
    }

    if(!input.email.trim().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error("Invalid email.")
    }

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userAuthProviderRepo.add(user)
  }
}