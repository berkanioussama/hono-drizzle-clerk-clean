import { User } from "../../domain/user.entity"
import { IUserRepo } from "../../domain/IUser.repo"
import { AddUserDTO } from "../dto/user.dto"
import { ProviderId, Email, ImageUrl } from "../../domain/user.vo"

export class AddUserByProviderUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: AddUserDTO) {

    const existingUser = await this.userRepo.findByProviderId(input.providerId)
    if (existingUser) throw new Error('User already exists')

    const providerId = ProviderId.create(input.providerId)
    const email = Email.create(input.email)
    const image = ImageUrl.create(input.image)

    const user =  User.create({
      providerId: providerId,
      name: input.name,
      email: email,
      image: image,
    });

    await this.userRepo.add(user)
  }
}