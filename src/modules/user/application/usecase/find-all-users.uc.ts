import { IUserRepo } from "../../domain/IUser.repo"
import { UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user-dto.mapper"

export class FindAllUsersUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(): Promise<UserDTO[]> {
    const users = await this.userRepo.findAll();
    return UserDTOMapper.toDTOList(users);
  }
}