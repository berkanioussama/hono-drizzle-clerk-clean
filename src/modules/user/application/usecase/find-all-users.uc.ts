import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepo.findAll();
    const output: UserDTO[] = users.map((user) => user.toJSON());
    return output;
  }
}