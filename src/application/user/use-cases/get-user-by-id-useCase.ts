import { GetUserInputDTO } from "../dto/get-user-DTO";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { GetUserOutputDTO } from "../dto/get-user-DTO";

export class GetUserByIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserInputDTO): Promise<GetUserOutputDTO | null> {
    if (!input.id || input.id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(input.id);

    if (!user) {
      return null;
    }

    const output: GetUserOutputDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return output;
  }
}