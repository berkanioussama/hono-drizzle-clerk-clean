import { IUserRepository } from "../../domain/IUser.repository";
import { DeleteUserByClerkInputDTO } from "../dto/user-input.dto";

export class DeleteUserByClerkUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: DeleteUserByClerkInputDTO): Promise<void> {
    const user = await this.userRepository.findByClerkUserId(input.clerkUserId);
    if (!user) throw new Error("User not found");
    await this.userRepository.remove(user.id);
  }
}