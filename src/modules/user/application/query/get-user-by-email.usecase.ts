import { IUserRepository } from "../../domain/IUser.repository";
import { UserMapper } from "../mapper/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";
import { GetUserByEmailInputDTO } from "../dto/user-input.dto";

export class GetUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(input: GetUserByEmailInputDTO): Promise<UserOutputDTO | null> {
    if (!input.email || input.email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepository.findByEmail(input.email);
    if (!user) return null;
    if (user.authProviderId !== input.authProviderId) {
        throw new Error("Unauthorized");
    }
    return UserMapper.toDTO(user);
  }
}