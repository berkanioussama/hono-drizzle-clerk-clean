import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserDTO } from "@/modules/user/application/dto/user.dto"
import { FindUserDTO } from "@/modules/user/application/dto/user.dto"

export class FindUserByIdUC {
  constructor(private userRepository: IUserRepo) {}

  async execute({id, providerId}: FindUserDTO): Promise<UserDTO | null> {
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