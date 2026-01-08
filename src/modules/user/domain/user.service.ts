import { IUserRepo } from "./IUser.repo";
import { Role } from "./user.entity";

export class AuthorizationService {
  constructor(private userRepo: IUserRepo) {}

  async isAdmin(userProviderId: string): Promise<boolean> {
    if (!userProviderId) {
      throw new Error("No user provider id provided");
    }
    const user = await this.userRepo.findByProviderId(userProviderId);
    return user?.role === Role.ADMIN;
  }

  async requireAdmin(userProviderId: string): Promise<void> {
    const isAdmin = await this.isAdmin(userProviderId);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
  }
}