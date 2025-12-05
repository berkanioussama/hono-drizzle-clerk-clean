import { IUserAuthProviderRepo } from "../../domain/IUser-authProvider-repo";
import { DeleteUserByAuthProviderIdInputDTO } from "../dto/user-input.dto";

export class DeleteUserByAuthProviderIdUC {
  constructor(private userAuthProviderRepo: IUserAuthProviderRepo) {}

  async execute(input: DeleteUserByAuthProviderIdInputDTO): Promise<void> {
    const user = await this.userAuthProviderRepo.findById(input.authProviderId);
    if (!user) throw new Error("User not found");
    await this.userAuthProviderRepo.remove(user.authProviderId);
  }
}