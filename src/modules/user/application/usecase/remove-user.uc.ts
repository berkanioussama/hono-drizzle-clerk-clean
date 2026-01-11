import { IUserRepo } from "../../domain/IUser.repo";
import { RemoveUserByProviderIdDTO } from "../dto/user.dto";

export class RemoveUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");

    await this.userRepo.remove(id);
  }
}

export class RemoveUserByProviderIdUC {
  constructor(private userRepo: IUserRepo) {}

  async execute({providerId}: RemoveUserByProviderIdDTO): Promise<void> {
    const user = await this.userRepo.findByProviderId(providerId);
    if (!user) throw new Error("User not found");
    
    await this.userRepo.removeByProviderId(providerId);
  }
}