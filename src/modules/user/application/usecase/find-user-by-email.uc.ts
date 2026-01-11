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
    return UserDTOMapper.toDTO(user)
  }
}