import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user-dto.mapper"

export class FindUserByIdAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(id: string): Promise<UserDTO | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("Invalid ID");
    }

    const user = await this.userRepo.findById(id);
    if (!user) return null;

    return UserDTOMapper.toDTO(user);
  }
}