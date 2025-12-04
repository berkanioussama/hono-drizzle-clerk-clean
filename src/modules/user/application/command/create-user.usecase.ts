import { User } from "../../domain/user.entity"
import { IUserRepository } from "../../domain/IUser.repository"
import { CreateUserInputDTO } from "../dto/user-input.dto"
import { UserMapper } from "../mapper/user.mapper"
import { UserOutputDTO } from "../dto/user-output.dto";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<UserOutputDTO> {

    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error("Invalid email.");
    }

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.add(user)

    return UserMapper.toDTO(createdUser)
  }
}