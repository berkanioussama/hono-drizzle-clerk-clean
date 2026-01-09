import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO, FindUserByEmailDTO } from "../dto/user.dto"
import { UserMapper } from "../dto/user.mapper"

export class FindUserByEmailUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute({email, providerId}: FindUserByEmailDTO): Promise<UserDTO | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepo.findByEmail(email)
    if (!user) return null;

    if (user.providerId.toString() !== providerId) {
      throw new Error("Unauthorized to access this resource")
    }
    return UserMapper.toDTO(user)
  }
}