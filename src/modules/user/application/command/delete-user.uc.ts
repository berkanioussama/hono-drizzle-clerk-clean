import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { DeleteUserInputDTO } from "@/modules/user/application/dto/user-input.dto";

export class DeleteUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: DeleteUserInputDTO): Promise<void> {
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepo.remove(input.id);
  }
}