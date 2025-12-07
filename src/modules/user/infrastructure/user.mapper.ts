import { User } from "@/modules/user/domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "@/shared/infrastructure/database/schema";
import { Email } from "@/modules/user/domain/user.vo";

type DBUser = InferSelectModel<typeof users>
    
export class UserMapper {
    
    static toDomain(user: DBUser): User {
        const email = Email.create(user.email)
        return new User({
            id: user.id,
            authProviderId: user.auth_provider_id,
            name: user.name,
            email: email,
            createdAt: new Date(user.created_at),
            updatedAt: new Date(user.updated_at),
        });
    }
}
