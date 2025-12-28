import { User } from "@/modules/user/domain/user.entity"
import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { AddUserDTO, UserDTO } from "@/modules/user/application/dto/user.dto"
import { Email } from "@/modules/user/domain/user.vo";

export class AddUserUC {
  constructor(private userRepository: IUserRepo) {}

  async execute(input: AddUserDTO): Promise<UserDTO> {

    const email = Email.create(input.email)

    const user = User.create({
      providerId: input.providerId,
      name: input.name,
      email: email,
      image: input.image,
    });

    const createdUser = await this.userRepository.add(user)

    return createdUser.toJSON()
  }
}