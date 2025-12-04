import { IUserRepository } from "../../domain/IUser.repository";
import { DeleteUserInputDTO } from "../dto/user-input.dto";

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: DeleteUserInputDTO): Promise<void> {
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepository.remove(input.id);
  }
}