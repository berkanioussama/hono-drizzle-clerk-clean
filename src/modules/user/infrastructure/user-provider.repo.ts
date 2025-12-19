import { User } from "@/modules/user/domain/user.entity";
import { db } from "@/shared/infrastructure/database/db";
import { users } from "@/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserMapper } from "./user.mapper";
import { IUserProviderRepo } from "@/modules/user/domain/IUser-provider.repo";

export class UserProviderRepo implements IUserProviderRepo {

    async add(user: User): Promise<User> {
        const insertedUser = await db.insert(users).values({
            id: user.id,
            provider_id: user.providerId,
            name: user.name,
            email: user.email,
            image: user.image,
            created_at: user.createdAt,
            updated_at: user.updatedAt,
        }).returning();

        return UserMapper.toDomain(insertedUser[0]);
    }

    async findById(providerId: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.provider_id, providerId)).limit(1);
        if (findedUser.length === 0) return null

        return UserMapper.toDomain(findedUser[0])
    }

    async remove(providerId: string): Promise<void> {
        await db.delete(users).where(eq(users.provider_id, providerId));
    }
}