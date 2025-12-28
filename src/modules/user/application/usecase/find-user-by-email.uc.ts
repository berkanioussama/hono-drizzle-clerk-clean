import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserDTO, FindUserByEmailDTO } from "@/modules/user/application/dto/user.dto"

export class FindUserByEmailUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute({email, providerId}: FindUserByEmailDTO): Promise<UserDTO | null> {
    if (!email || email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepo.findByEmail(email)
    if (!user) return null;

    if (user.providerId !== providerId) {
      throw new Error("Unauthorized to access this resource")
    }
    return user.toJSON()
  }
}