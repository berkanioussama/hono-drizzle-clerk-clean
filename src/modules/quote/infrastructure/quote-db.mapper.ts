import { InferSelectModel } from "drizzle-orm";
import { quotes } from "../../../shared/infrastructure/database/schema";
import { Quote } from "../domain/quote.entity";

type DBQuote = InferSelectModel<typeof quotes>

export class QuoteDBMapper {
    static toDomain(dbQuote: DBQuote): Quote {
        return Quote.fromPersistence({
            id: dbQuote.id,
            userId: dbQuote.userId,
            author: dbQuote.author,
            description: dbQuote.description,
            createdAt: new Date(dbQuote.createdAt),
            updatedAt: new Date(dbQuote.updatedAt),
        });
    }

    static toDomainList(dbQuotes: DBQuote[]): Quote[] {
        return dbQuotes.map(dbQuote => this.toDomain(dbQuote));
    }
}
