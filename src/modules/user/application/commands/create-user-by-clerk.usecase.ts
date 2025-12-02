import { User } from "../../domain/user.entity";
import { IUserRepository } from "../../domain/IUser.repository";
import { CreateUserInputDTO } from "../dto/user-input.dto";
import { UserMapper } from "../mappers/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class CreateUserByClerkUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<UserOutputDTO> {

    const existingUser = await this.userRepository.findByClerkUserId(input.clerkUserId)
    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = new User({
      id: crypto.randomUUID(),
      clerkUserId: input.clerkUserId,
      name: input.name || '',
      email: input.email || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.add(user)
    return UserMapper.toDTO(createdUser)
  }
}