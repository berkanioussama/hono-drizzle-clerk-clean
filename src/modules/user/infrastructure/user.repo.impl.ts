import { User } from "../domain/user.entity";
import { IUserRepo } from "../domain/IUser.repo";
import { db } from "../../../shared/infrastructure/database/db";
import { users } from "../../../shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserDBMapper } from "./user-db.mapper";

export class UserRepoImpl implements IUserRepo {
    
    async add(user: User): Promise<User> {
        const insertedUser = await db.insert(users).values({
            id: user.id,
            providerId: user.providerId.toString(),
            name: user.name,
            email: user.email.toString(),
            image: user.image?.toString(),
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }).returning();

        return UserDBMapper.toDomain(insertedUser[0]);
    }

    async edit(user: User): Promise<User> {
        const updatedUser = await db.update(users).set({
            name: user.name,
            email: user.email.toString(),
            image: user.image?.toString(),
            updatedAt: user.updatedAt,
        }).where(eq(users.id, user.id)).returning();
        
        return UserDBMapper.toDomain(updatedUser[0]);
    }

    async findAll(): Promise<User[]> {
        const findedUsers = await db.select().from(users)
        return findedUsers.map(
            findedUser => UserDBMapper.toDomain(findedUser)
        )

    }
    
    async findById(id: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }

    async findByProviderId(providerId: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.providerId, providerId)).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }
    
    async findByEmail(email: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
        if (findedUser.length === 0) return null

        return UserDBMapper.toDomain(findedUser[0])
    }

    async remove(id: string): Promise<void> {
        await db.delete(users).where(eq(users.id, id));
    }
    
    async removeByProviderId(providerId: string): Promise<void> {
        await db.delete(users).where(eq(users.providerId, providerId));
    }
}