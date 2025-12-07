import { User } from "@/modules/user/domain/user.entity";
import { IUserRepo } from "@/modules/user/domain/IUser.repo";
import { db } from "@/shared/infrastructure/database/db";
import { users } from "@/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserMapper } from "@/modules/user/infrastructure/user.mapper";

export class UserRepo implements IUserRepo {
    
    async add(user: User): Promise<User> {
        const insertedUser = await db.insert(users).values({
            id: user.id,
            auth_provider_id: user.authProviderId,
            name: user.name,
            email: user.email,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        }).returning();

        return UserMapper.toDomain(insertedUser[0]);
    }
    
    async findById(id: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if (findedUser.length === 0) return null

        return UserMapper.toDomain(findedUser[0])
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (findedUser.length === 0) return null

        return UserMapper.toDomain(findedUser[0])
    }
    
    async findAll(): Promise<User[]> {
        const findedUsers = await db.select().from(users)
        return findedUsers.map(
            findedUser => UserMapper.toDomain(findedUser)
        )

    }
    
    async edit(user: User): Promise<User> {
        const updatedUser = await db.update(users).set({
            name: user.name,
            email: user.email,
            updated_at: user.updatedAt,
        }).where(eq(users.id, user.id)).returning();
        
        return UserMapper.toDomain(updatedUser[0]);
    }

    async remove(id: string): Promise<void> {
        await db.delete(users).where(eq(users.id, id));
    }
}