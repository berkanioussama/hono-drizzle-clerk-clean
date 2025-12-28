import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserOutputDTO } from "@/modules/user/application/dto/user.dto"
import { FindUserInputDTO } from "@/modules/user/application/dto/user.dto"

export class FindUserByIdUC {
  constructor(private userRepository: IUserRepo) {}

  async execute({id, providerId}: FindUserInputDTO): Promise<UserOutputDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(id);
    if (!user) return null;

    if (user.providerId !== providerId) {
      throw new Error("Unauthorized to access this resource");
    }

    return user.toJSON();
  }
}