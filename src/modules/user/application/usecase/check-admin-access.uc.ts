import { IUserRepo } from "../../domain/IUser.repo";
import { Role } from "../../domain/user.entity";

export class CheckAdminAccessUC {
  constructor(private userRepo: IUserRepo) {}

    async execute(userProviderId: string): Promise<boolean> {
        if (!userProviderId) {
            throw new Error("No user provider id provided");
        }
        const user = await this.userRepo.findByProviderId(userProviderId);
        return user?.role === Role.ADMIN;
    }
}