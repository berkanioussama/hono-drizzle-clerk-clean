import { IUserRepo } from "../../domain/IUser.repo";
import { UpdateUserInputDTO } from "../dto/user-input.dto";
import { UserOutputDTO } from "../dto/user-output.dto";

export class UpdateUserUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: UpdateUserInputDTO): Promise<UserOutputDTO> {
    
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found");
    
    if (input.name) user.changeName(input.name);
    if (input.email) user.changeEmail(input.email);
    user.changeUpdatedAt(new Date());

    const updatedUser = await this.userRepo.edit(user); 

    return updatedUser.toJSON();
  }
}
