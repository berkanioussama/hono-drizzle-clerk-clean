import { IUserProviderRepo } from "@/modules/user/domain/IUser-provider.repo";

export class CheckAdminAccessUC {
  constructor(private userProviderRepo: IUserProviderRepo) {}

    async execute(userProviderId: string): Promise<boolean> {
        if (!userProviderId) {
            throw new Error("No user provider id provided");
        }
        const user = await this.userProviderRepo.findById(userProviderId);
        return user?.role === 'admin';
    }
}