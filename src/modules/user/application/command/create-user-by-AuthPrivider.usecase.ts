import { User } from "../../domain/user.entity"
import { IUserRepository } from "../../domain/IUser.repository"
import { CreateUserInputDTO } from "../dto/user-input.dto"

export class CreateUserByAuthProviderIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInputDTO) {

    const existingUser = await this.userRepository.findByAuthProviderId(input.authProviderId)
    if (existingUser) {
      throw new Error('User already exists')
    }

    if (!input.name || input.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters.')
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error('Invalid email.')
    }

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userRepository.add(user)
  }
}