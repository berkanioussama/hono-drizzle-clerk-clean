import { Role, User } from "@/modules/user/domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "@/shared/infrastructure/database/schema";
import { Email } from "@/modules/user/domain/user.vo";

type DBUser = InferSelectModel<typeof users>
    
export class UserMapper {
    
    static toDomain(user: DBUser): User {
        const email = Email.create(user.email)
        return User.fromPersistence({
            id: user.id,
            providerId: user.providerId,
            name: user.name,
            email: email,
            image: user.image,
            role: user.role as Role,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt),
        });
    }
}
