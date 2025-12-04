import { IUserRepository } from "../../domain/IUser.repository";
import { UserMapper } from "../mapper/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<UserOutputDTO[]> {
    const users = await this.userRepository.findAll();
    const output: UserOutputDTO[] = users.map((user) => UserMapper.toDTO(user));
    return output;
  }
}