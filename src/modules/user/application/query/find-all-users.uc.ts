import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { UserOutputDTO } from "@/modules/user/application/dto/user-output.dto"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(): Promise<UserOutputDTO[]> {
    const users = await this.userRepo.findAll();
    const output: UserOutputDTO[] = users.map((user) => user.toJSON());
    return output;
  }
}