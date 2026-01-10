import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote-dto.mapper"

export class FindAllQuotesAdminUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(): Promise<QuoteDTO[]> {
        const quotes = await this.quoteRepo.findAll();
        return QuoteDTOMapper.toDTOList(quotes);
    }
}