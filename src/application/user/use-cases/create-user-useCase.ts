import { User } from "../../../domain/entities/user"
import { UserRepository } from "../../../domain/repositories/user-repository"
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dto/create-user-DTO"

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {

    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    if (!input.email || !input.email.includes("@")) {
      throw new Error("Invalid email.");
    }

    // Create domain entity
    const user = new User({
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Save to repository (infrastructure implements this)
    const createdUser = await this.userRepository.create(user);

    const output: CreateUserOutputDTO = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt.toISOString(),
      updatedAt: createdUser.updatedAt.toISOString(),
    };

    return output;
  }
}