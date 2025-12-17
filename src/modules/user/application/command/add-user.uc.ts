import { Role, User } from "@/modules/user/domain/user.entity"
import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { AddUserInputDTO } from "@/modules/user/application/dto/user-input.dto"
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto";
import { Email } from "@/modules/user/domain/user.vo";

export class AddUserUC {
  constructor(private userRepository: IUserRepo) {}

  async execute(input: AddUserInputDTO): Promise<UserOutputDTO> {

    if (!input.name || input.name.trim().length < 2) {
      throw new Error("Name must be at least 2 characters.");
    }

    const email = Email.create(input.email)

    const user = new User({
      id: crypto.randomUUID(),
      providerId: input.providerId,
      name: input.name,
      email: email,
      image: input.image,
      role: Role.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.add(user)

    return createdUser.toJSON()
  }
}