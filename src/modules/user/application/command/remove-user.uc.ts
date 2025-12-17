import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { RemoveUserInputDTO } from "@/modules/user/application/dto/user-input.dto";

export class RemoveUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: RemoveUserInputDTO): Promise<void> {
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepo.remove(input.id);
  }
}