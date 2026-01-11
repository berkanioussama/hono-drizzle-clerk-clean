import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO, FindUserByEmailDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user-dto.mapper"

export class FindUserByEmailAdminUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute(email: string): Promise<UserDTO | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepo.findByEmail(email)
    if (!user) return null;

    return UserDTOMapper.toDTO(user)
  }
}