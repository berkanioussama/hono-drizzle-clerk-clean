import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote-dto.mapper"

export class FindQuoteByIdAdminUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(id: string): Promise<QuoteDTO | null> {
        if (!id || id.trim().length === 0) {
            throw new Error("Invalid ID");
        }

        const quote = await this.quoteRepo.findById(id);
        if (!quote) return null;

        return QuoteDTOMapper.toDTO(quote);
    }
}