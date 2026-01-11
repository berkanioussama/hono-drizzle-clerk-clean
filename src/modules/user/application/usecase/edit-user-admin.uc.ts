import { IUserRepo } from "../../domain/IUser.repo";
import { Email, ImageUrl } from "../../domain/user.vo";
import { EditUserAdminDTO, UserDTO } from "../dto/user.dto";
import { UserDTOMapper } from "../dto/user-dto.mapper";

export class EditUserAdminUC {
  constructor(private userRepo: IUserRepo) {}

  async execute(input: EditUserAdminDTO): Promise<UserDTO> {
    
    const user = await this.userRepo.findById(input.id);
    if (!user) throw new Error("User not found")
    
    if (input.name) {
      user.changeName(input.name)
    }

    if (input.email) {
      const email = Email.create(input.email)
      user.changeEmail(email)
    }
    if (input.image) {
      const image = ImageUrl.create(input.image)
      user.changeImage(image)
    }

    const updatedUser = await this.userRepo.edit(user)

    return UserDTOMapper.toDTO(updatedUser)
  }
}