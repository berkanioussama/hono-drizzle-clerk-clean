import { IQuoteRepo } from "../../domain/IQuote.repo"
import { QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote-dto.mapper"

export class FindQuotesByUserIdAdminUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute(userId: string): Promise<QuoteDTO[]> {
    if (!userId || userId.trim().length === 0) {
      throw new Error("Invalid user ID");
    }

    const quotes = await this.quoteRepo.findByUserId(userId);
    
    return QuoteDTOMapper.toDTOList(quotes);
  }
}