import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto"
import { GetUserInputDTO } from "@/modules/user/application/dto/user-input.dto"

export class GetUserByIdUC {
  constructor(private userRepository: IUserRepo) {}

  async execute(input: GetUserInputDTO): Promise<UserOutputDTO | null> {
    if (!input.id || input.id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(input.id);

    if (!user) return null;
    if (user.authProviderId !== input.authProviderId) {
        throw new Error("Unauthorized");
    }

    return user.toJSON();
  }
}