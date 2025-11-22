import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user-repository";

export class GetUserByEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(email: string): Promise<User | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    return await this.userRepository.findByEmail(email);
  }
}