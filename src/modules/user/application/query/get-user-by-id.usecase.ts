import { IUserRepository } from "../../domain/IUser.repository";
import { UserMapper } from "../mapper/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";
import { GetUserInputDTO } from "../dto/user-input.dto";

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: GetUserInputDTO): Promise<UserOutputDTO | null> {
    if (!input.id || input.id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(input.id);

    if (!user) return null;
    if (user.authProviderId !== input.authProviderId) {
        throw new Error("Unauthorized");
    }

    return UserMapper.toDTO(user);
  }
}