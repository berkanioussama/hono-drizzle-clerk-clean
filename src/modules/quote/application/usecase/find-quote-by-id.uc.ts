import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { FindQuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote-dto.mapper"

export class FindQuoteByIdUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute({id, userId}: FindQuoteDTO): Promise<QuoteDTO | null> {
        if (!id || id.trim().length === 0) {
            throw new Error("Invalid ID");
        }

        const quote = await this.quoteRepo.findById(id);
        if (!quote) return null;

        if (quote.userId !== userId) {
            throw new Error("Unauthorized to access this quote");
        }

        return QuoteDTOMapper.toDTO(quote);
    }
}