import { IUserRepository } from "../../domain/IUser.repository";
import { UpdateUserInputDTO } from "../dto/user-input.dto";
import { UserMapper } from "../mapper/user.mapper";
import { UserOutputDTO } from "../dto/user-output.dto";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(input: UpdateUserInputDTO): Promise<UserOutputDTO> {
    
    const user = await this.userRepository.findById(input.id);
    if (!user) throw new Error("User not found");
    
    if (input.name) user.changeName(input.name);
    if (input.email) user.changeEmail(input.email);
    user.changeUpdatedAt(new Date());

    const updatedUser = await this.userRepository.edit(user); 

    return UserMapper.toDTO(updatedUser);
  }
}
