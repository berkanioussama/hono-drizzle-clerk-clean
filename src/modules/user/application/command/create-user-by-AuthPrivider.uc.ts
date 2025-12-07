import { User } from "@/modules/user/domain/user.entity"
import { IUserAuthProviderRepo } from "@/modules/user/domain/IUser-authProvider-repo"
import { CreateUserInputDTO } from "@/modules/user/application/dto/user-input.dto"
import { Email } from "@/modules/user/domain/user.vo"

export class CreateUserByAuthProviderIdUC {
  constructor(private userAuthProviderRepo: IUserAuthProviderRepo) {}

  async execute(input: CreateUserInputDTO) {

    const existingUser = await this.userAuthProviderRepo.findById(input.authProviderId)
    if (existingUser) throw new Error('User already exists')

    if (!input.name || input.name.trim().length < 2) {
      throw new Error('Name must be at least 2 characters.')
    }

    const email = Email.create(input.email)

    const user = new User({
      id: crypto.randomUUID(),
      authProviderId: input.authProviderId,
      name: input.name,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userAuthProviderRepo.add(user)
  }
}