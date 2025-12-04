import { IUserRepository } from "../../domain/IUser.repository";
import { DeleteUserByAuthProviderIdInputDTO } from "../dto/user-input.dto";

export class DeleteUserByAuthProviderIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: DeleteUserByAuthProviderIdInputDTO): Promise<void> {
    const user = await this.userRepository.findByAuthProviderId(input.authProviderId);
    if (!user) throw new Error("User not found");
    await this.userRepository.remove(user.id);
  }
}