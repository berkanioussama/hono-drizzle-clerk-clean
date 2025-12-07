import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto"
import { GetUserByEmailInputDTO } from "@/modules/user/application/dto/user-input.dto"

export class GetUserByEmailUC {
  constructor(private userRepo: IUserRepo) {}
  
  async execute(input: GetUserByEmailInputDTO): Promise<UserOutputDTO | null> {
    if (!input.email || input.email.trim().length === 0) {
      throw new Error("Invalid email");
    }

    const user = await this.userRepo.findByEmail(input.email)
    if (!user) return null;
    if (user.authProviderId !== input.authProviderId) {
        throw new Error("Unauthorized")
    }
    return user.toJSON()
  }
}