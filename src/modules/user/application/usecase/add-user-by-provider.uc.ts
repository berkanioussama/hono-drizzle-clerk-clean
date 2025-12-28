import { User } from "@/modules/user/domain/user.entity"
import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { AddUserInputDTO } from "@/modules/user/application/dto/user.dto"
import { Email } from "@/modules/user/domain/user.vo"

export class AddUserByProviderUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: AddUserInputDTO) {

    const existingUser = await this.userRepo.findByProviderId(input.providerId)
    if (existingUser) throw new Error('User already exists')

    const email = Email.create(input.email)

    const user =  User.create({
      providerId: input.providerId,
      name: input.name,
      email: email,
      image: input.image,
    });

    await this.userRepo.add(user)
  }
}