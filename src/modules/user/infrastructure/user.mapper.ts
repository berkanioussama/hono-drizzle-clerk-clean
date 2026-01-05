import { Role, User } from "../domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../../shared/infrastructure/database/schema";
import { Email } from "../domain/user.vo";

type DBUser = InferSelectModel<typeof users>
    
export class UserMapper {
    
    static toDomain(dbUser: DBUser): User {
        const email = Email.create(dbUser.email)
        return User.fromPersistence({
            id: dbUser.id,
            providerId: dbUser.providerId,
            name: dbUser.name,
            email: email,
            image: dbUser.image,
            role: dbUser.role as Role,
            createdAt: new Date(dbUser.createdAt),
            updatedAt: new Date(dbUser.updatedAt),
        });
    }
}
