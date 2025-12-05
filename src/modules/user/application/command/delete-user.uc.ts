import { IUserRepo } from "../../domain/IUser.repo";
import { DeleteUserInputDTO } from "../dto/user-input.dto";

export class DeleteUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: DeleteUserInputDTO): Promise<void> {
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found");

    await this.userRepo.remove(input.id);
  }
}