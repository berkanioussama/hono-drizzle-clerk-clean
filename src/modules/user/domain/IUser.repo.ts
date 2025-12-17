import { User } from "@/modules/user/domain/user.entity"

export interface IUserRepo {
  add(user: User): Promise<User>
  edit(user: User): Promise<User>
  findAll(): Promise<User[]>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  remove(id: string): Promise<void>
}