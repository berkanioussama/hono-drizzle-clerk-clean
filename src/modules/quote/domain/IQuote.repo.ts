import { Quote } from "./quote.entity"

export interface IQuoteRepo {
    add(quote: Quote): Promise<Quote>
    edit(quote: Quote): Promise<Quote>
    findAll(): Promise<Quote[]>
    findById(id: string): Promise<Quote | null>
    findByUserId(userId: string): Promise<Quote[]>
    remove(id: string): Promise<void>
}