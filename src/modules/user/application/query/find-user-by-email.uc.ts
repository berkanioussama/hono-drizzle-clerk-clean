import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto"
import { FindUserByEmailInputDTO } from "@/modules/user/application/dto/user-input.dto"

export class FindUserByEmailUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute(input: FindUserByEmailInputDTO): Promise<UserOutputDTO | null> {
    if (!input.email || input.email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepo.findByEmail(input.email)
    if (!user) return null;
    if (user.providerId !== input.providerId) {
        throw new Error("Unauthorized")
    }
    return user.toJSON()
  }
}