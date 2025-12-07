import { IUserAuthProviderRepo } from "@/modules/user/domain/IUser-authProvider-repo"
import { GetUserByAuthProviderInputDTO } from "@/modules/user/application/dto/user-input.dto"

export class GetUserByAuthProviderIdUC {
    constructor(private userAuthProviderRepo: IUserAuthProviderRepo) {}

    async execute(input: GetUserByAuthProviderInputDTO) {
        const user = await this.userAuthProviderRepo.findById(input.authProviderId)
        if (!user) throw new Error('User not found')
        return user
    }
}