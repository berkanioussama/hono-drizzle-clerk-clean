import { User } from "@/modules/user/domain/user.entity"

export interface IUserRepo {
  add(user: User): Promise<User>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
  edit(user: User): Promise<User>
  remove(id: string): Promise<void>
}