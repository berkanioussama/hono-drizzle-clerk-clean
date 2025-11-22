import { UserRepository } from "../../../domain/repositories/user-repository";
import { DeleteUserInputDTO, DeleteUserOutputDTO } from "../dto/delete-user-DTO";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: DeleteUserInputDTO): Promise<DeleteUserOutputDTO> {
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepository.delete(input.id);

    return {
      id: input.id,
      deletedAt: new Date().toISOString(),
    };
  }
}