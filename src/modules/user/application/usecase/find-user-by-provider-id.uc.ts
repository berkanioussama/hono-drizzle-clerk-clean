import { IUserRepo } from "@/modules/user/domain/IUser.repo"
import { FindUserByProviderIdInputDTO } from "@/modules/user/application/dto/user.dto"
import { UserOutputDTO } from "@/modules/user/application/dto/user.dto"

export class FindUserByProviderIdUC {
    constructor(private userRepo: IUserRepo) {}

    async execute({providerId}: FindUserByProviderIdInputDTO): Promise<UserOutputDTO> {
        const user = await this.userRepo.findByProviderId(providerId)
        if (!user) throw new Error('User not found')

        return user.toJSON()
    }
}