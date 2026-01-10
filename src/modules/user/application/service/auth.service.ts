import { IUserRepo } from "../../domain/IUser.repo";
import { Role } from "../../domain/user.entity";

export class AuthService {
  constructor(private userRepo: IUserRepo ) {}

  async isAdmin(providerId: string): Promise<boolean> {
    if (!providerId) {
      throw new Error("No user provider id provided");
    }
    const user = await this.userRepo.findByProviderId(providerId);
    return user?.role === Role.ADMIN;
  }

  async requireAdmin(providerId: string): Promise<void> {
    const isAdmin = await this.isAdmin(providerId);
    if (!isAdmin) {
      throw new Error("Admin access required");
    }
  }
}