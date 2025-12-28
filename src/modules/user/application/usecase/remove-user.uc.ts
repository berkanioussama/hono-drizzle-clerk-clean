import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { RemoveUserDTO } from "@/modules/user/application/dto/user.dto";

export class RemoveUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute({id}: RemoveUserDTO): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new Error("User not found");

    await this.userRepo.remove(id);
  }
}