import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserDTO } from "@/modules/user/application/dto/user.dto"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepo.findAll();
    const output: UserDTO[] = users.map((user) => user.toJSON());
    return output;
  }
}