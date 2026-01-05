import { IUserRepo } from "../../domain/IUser.repo"
import { FindUserByProviderIdDTO, UserDTO } from "../dto/user.dto"

export class FindUserByProviderIdUC {
    constructor(private userRepo: IUserRepo) {}

    async execute({providerId}: FindUserByProviderIdDTO): Promise<UserDTO> {
        const user = await this.userRepo.findByProviderId(providerId)
        if (!user) throw new Error('User not found')

        return user.toJSON()
    }
}