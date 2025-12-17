import { User } from "@/modules/user/domain/user.entity"

export interface IUserProviderRepo {
    add(user: User): Promise<User>
    findById(providerId: string): Promise<User | null>
    remove(providerId: string): Promise<void>
}