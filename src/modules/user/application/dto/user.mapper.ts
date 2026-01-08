import { User } from "../../domain/user.entity";
import { UserDTO } from "./user.dto";

export class UserMapper {
  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      providerId: user.providerId,
      name: user.name,
      email: user.email.toString(),
      image: user.image,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDTOList(users: User[]): UserDTO[] {
    return users.map(user => this.toDTO(user));
  }
}