import { User } from "../domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../../shared/infrastructure/database/schema";

type DBUser = InferSelectModel<typeof users>
    
export class UserMapper {
    
    static toDomain(user: DBUser): User {
        return new User({
            id: user.id,
            authProviderId: user.auth_provider_id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.created_at),
            updatedAt: new Date(user.updated_at),
        });
    }
}
