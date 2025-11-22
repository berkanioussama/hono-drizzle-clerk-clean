import { UserRepository } from "../../../domain/repositories/user-repository";
import { GetUserOutputDTO } from "../dto/get-user-DTO";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<GetUserOutputDTO[]> {
    const users = await this.userRepository.getAll();

    const output: GetUserOutputDTO[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    return output;
  }
}