import { IUserRepository } from "../../domain/IUser.repository";
import { UserMapper } from "../mappers/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class GetUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(email: string): Promise<UserOutputDTO | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return UserMapper.toDTO(user);
  }
}