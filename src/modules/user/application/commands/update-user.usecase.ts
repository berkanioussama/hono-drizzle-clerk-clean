import { IUserRepository } from "../../domain/IUser.repository";
import { UpdateUserInputDTO } from "../dto/user-input.dto";
import { UserMapper } from "../mappers/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: UpdateUserInputDTO): Promise<UserOutputDTO> {
    console.log(input)
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");
    console.log(user)
    if (input.name) user.changeName(input.name);
    if (input.email) user.changeEmail(input.email);
    console.log(user)

    const updatedUser = await this.userRepository.edit(user); 

    return UserMapper.toDTO(updatedUser);
  }
}
