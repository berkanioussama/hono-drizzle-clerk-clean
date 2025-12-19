import { IUserProviderRepo } from "@/modules/user/domain/IUser-provider.repo";
import { RemoveUserByProviderIdInputDTO } from "@/modules/user/application/dto/user-input.dto";

export class RemoveUserByProviderIdUC {
  constructor(private userProviderRepo: IUserProviderRepo) {}

  async execute(input: RemoveUserByProviderIdInputDTO): Promise<void> {
    const user = await this.userProviderRepo.findById(input.providerId);
    if (!user) throw new Error("User not found");
    await this.userProviderRepo.remove(user.providerId);
  }
}