import { IUserProviderRepo } from "@/modules/user/domain/IUser-provider.repo"
import { FindUserByProviderIdInputDTO } from "@/modules/user/application/dto/user-input.dto"

export class FindUserByProviderIdUC {
    constructor(private userProviderRepo: IUserProviderRepo) {}

    async execute(input: FindUserByProviderIdInputDTO) {
        const user = await this.userProviderRepo.findById(input.providerId)
        if (!user) throw new Error('User not found')
        return user
    }
}