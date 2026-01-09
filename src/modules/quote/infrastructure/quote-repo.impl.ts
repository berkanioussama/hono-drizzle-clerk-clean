import { Quote } from "../domain/quote.entity";
import { IQuoteRepo } from "../domain/IQuote.repo";
import { db } from "../../../shared/infrastructure/database/db";
import { quotes } from "../../../shared/infrastructure/database/schema";
import { eq } from "drizzle-orm";
import { QuoteDBMapper } from "./quote-db.mapper";

export class QuoteRepoImpl implements IQuoteRepo {
    
    async add(quote: Quote): Promise<Quote> {
        const insertedQuote = await db.insert(quotes).values({
            id: quote.id,
            userId: quote.userId,
            author: quote.author,
            description: quote.description,
            createdAt: quote.createdAt,
            updatedAt: quote.updatedAt,
        }).returning();

        return QuoteDBMapper.toDomain(insertedQuote[0]);
    }

    async edit(quote: Quote): Promise<Quote> {
        const updatedQuote = await db.update(quotes).set({
            author: quote.author,
            description: quote.description,
            updatedAt: quote.updatedAt,
        }).where(eq(quotes.id, quote.id)).returning();
        
        return QuoteDBMapper.toDomain(updatedQuote[0]);
    }

    async findAll(): Promise<Quote[]> {
        const findedQuotes = await db.select().from(quotes)
        return QuoteDBMapper.toDomainList(findedQuotes)
    }
    
    async findById(id: string): Promise<Quote | null> {
        const findedQuote = await db.select().from(quotes).where(eq(quotes.id, id)).limit(1);
        if (findedQuote.length === 0) return null

        return QuoteDBMapper.toDomain(findedQuote[0])
    }

    async findByUserId(userId: string): Promise<Quote[]> {
        const findedQuotes = await db.select().from(quotes).where(eq(quotes.userId, userId));
        return QuoteDBMapper.toDomainList(findedQuotes)
    }

    async remove(id: string): Promise<void> {
        await db.delete(quotes).where(eq(quotes.id, id));
    }
}