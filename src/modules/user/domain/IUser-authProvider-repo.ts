import { User } from "@/modules/user/domain/user.entity"

export interface IUserAuthProviderRepo {
    add(user: User): Promise<User>
    findById(authProviderId: string): Promise<User | null>
    remove(authProviderId: string): Promise<void>
}