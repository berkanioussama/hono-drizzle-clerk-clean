import { User } from "@/modules/user/domain/user.entity";
import { db } from "@/shared/infrastructure/database/db";
import { users } from "@/shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { UserMapper } from "./user.mapper";
import { IUserAuthProviderRepo } from "@/modules/user/domain/IUser-authProvider-repo";

export class UserAuthProviderRepo implements IUserAuthProviderRepo {

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

    async findById(authProviderId: string): Promise<User | null> {
        const findedUser = await db.select().from(users).where(eq(users.auth_provider_id, authProviderId)).limit(1);
        if (findedUser.length === 0) return null

        return UserMapper.toDomain(findedUser[0])
    }

    async remove(authProviderId: string): Promise<void> {
        await db.delete(users).where(eq(users.auth_provider_id, authProviderId));
    }
}