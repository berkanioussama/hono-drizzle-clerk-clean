import { IUserRepo } from "../../domain/IUser.repo";
import { User } from "../../domain/user.entity";

export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async findUserByProviderId(providerId: string): Promise<User | null> {
    return this.userRepo.findByProviderId(providerId);
  }
}