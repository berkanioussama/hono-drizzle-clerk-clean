import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { FindUserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user-dto.mapper"

export class FindUserByIdUC {
  constructor(private userRepository: IUserRepo) {}

  async execute({id, providerId}: FindUserDTO): Promise<UserDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepository.findById(id);
    if (!user) return null;

    if (user.providerId.toString() !== providerId) {
      throw new Error("Unauthorized to access this resource");
    }

    return UserDTOMapper.toDTO(user);
  }
}