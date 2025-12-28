import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { RemoveUserByProviderIdInputDTO } from "@/modules/user/application/dto/user.dto";

export class RemoveUserByProviderIdUC {
  constructor(private userRepo: IUserRepo) {}

  async execute({providerId}: RemoveUserByProviderIdInputDTO): Promise<void> {
    const user = await this.userRepo.findByProviderId(providerId);
    if (!user) throw new Error("User not found");
    
    await this.userRepo.removeByProviderId(providerId);
  }
}