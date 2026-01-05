import { User } from "../../domain/user.entity"
import { IUserRepo } from "../../domain/IUser.repo"
import { AddUserDTO } from "../dto/user.dto"
import { Email } from "../../domain/user.vo"

export class AddUserByProviderUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: AddUserDTO) {

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