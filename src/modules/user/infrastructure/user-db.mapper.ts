import { Role, User } from "../domain/user.entity";
import { InferSelectModel } from "drizzle-orm";
import { users } from "../../../shared/infrastructure/database/schema";
import { Email, ImageUrl, ProviderId } from "../domain/user.vo";

type DBUser = InferSelectModel<typeof users>
    
export class UserDBMapper {
    
    static toDomain(dbUser: DBUser): User {
        const providerId = ProviderId.fromPersistence(dbUser.providerId)
        const email = Email.fromPersistence(dbUser.email)
        const image = ImageUrl.fromPersistence(dbUser.image)
        
        return User.fromPersistence({
            id: dbUser.id,
            providerId: providerId,
            name: dbUser.name,
            email: email,
            image: image,
            role: dbUser.role as Role,
            createdAt: new Date(dbUser.createdAt),
            updatedAt: new Date(dbUser.updatedAt),
        });
    }
}
