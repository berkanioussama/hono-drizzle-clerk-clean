import { Role, User } from "@/modules/user/domain/user.entity"
import { IUserProviderRepo } from "@/modules/user/domain/IUser-provider.repo"
import { AddUserInputDTO } from "@/modules/user/application/dto/user-input.dto"
import { Email } from "@/modules/user/domain/user.vo"

export class AddUserByProviderUC {
  constructor(private userProviderRepo: IUserProviderRepo) {}

  async execute(input: AddUserInputDTO) {

    const existingUser = await this.userProviderRepo.findById(input.providerId)
    if (existingUser) throw new Error('User already exists')

    if (!input.name || input.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters.')
    }
    if (!input.email) { throw new Error('Email is required') }
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

    await this.userProviderRepo.add(user)
  }
}