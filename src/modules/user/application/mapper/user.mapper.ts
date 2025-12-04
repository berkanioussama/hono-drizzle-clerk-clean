import { User } from "../../domain/user.entity";
import { UserOutputDTO } from "../dto/user-output.dto";

export class UserMapper {
  static toDTO(user: User): UserOutputDTO {
    return {
      id: user.id,
      authProviderId: user.authProviderId,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}