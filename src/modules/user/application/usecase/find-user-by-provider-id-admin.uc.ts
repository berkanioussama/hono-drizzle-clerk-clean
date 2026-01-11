import { IUserRepo } from "../../domain/IUser.repo"
import { FindUserByProviderIdDTO, UserDTO } from "../dto/user.dto"
import { UserDTOMapper } from "../dto/user-dto.mapper"

export class FindUserByProviderIdAdminUC {
    constructor(private userRepo: IUserRepo) {}

    async execute({providerId}: FindUserByProviderIdDTO): Promise<UserDTO> {
        const user = await this.userRepo.findByProviderId(providerId)
        if (!user) throw new Error('User not found')

        return UserDTOMapper.toDTO(user)
    }
}