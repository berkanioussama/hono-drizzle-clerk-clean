import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { UpdateUserInputDTO } from "@/modules/user/application/dto/user-input.dto";
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto";
import { Email } from "@/modules/user/domain/user.vo";

export class UpdateUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: UpdateUserInputDTO): Promise<UserOutputDTO> {
    
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found")
    
    if (input.name) {
      if (!input.name || input.name.trim().length < 2) {
        throw new Error('Name must be at least 2 characters.')
      }
      user.changeName(input.name)
    }

    if (input.email) {
      const email = Email.create(input.email)
      user.changeEmail(email)
    }

    user.changeUpdatedAt(new Date())

    const updatedUser = await this.userRepo.edit(user)

    return updatedUser.toJSON()
  }
}
