import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserMapper } from "../dto/user.mapper"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepo.findAll();
    const output: UserDTO[] = UserMapper.toDTOList(users);
    return output;
  }
}