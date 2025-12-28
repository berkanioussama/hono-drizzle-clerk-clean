import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { Email } from "@/modules/user/domain/user.vo";
import { EditUserInputDTO, UserOutputDTO } from "@/modules/user/application/dto/user.dto";

export class EditUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: EditUserInputDTO): Promise<UserOutputDTO> {
    
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found")
    
    if (input.name) {
      user.changeName(input.name)
    }

    if (input.email) {
      const email = Email.create(input.email)
      user.changeEmail(email)
    }
    if (input.image) {
      user.changeImage(input.image)
    }

    const updatedUser = await this.userRepo.edit(user)

    return updatedUser.toJSON()
  }
}
