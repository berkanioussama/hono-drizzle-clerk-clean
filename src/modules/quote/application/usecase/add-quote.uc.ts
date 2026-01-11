import { Quote } from "../../domain/quote.entity"
import { IQuoteRepo } from "../../domain/IQuote.repo"
import { AddQuoteDTO, QuoteDTO } from "../dto/quote.dto"
import { QuoteDTOMapper } from "../dto/quote-dto.mapper";

export class AddQuoteUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(input: AddQuoteDTO): Promise<QuoteDTO> {

      const quote = Quote.create({
      userId: input.userId,
      author: input.author,
      description: input.description,
      });

      const createdQuote = await this.quoteRepo.add(quote)

      return QuoteDTOMapper.toDTO(createdQuote)
  }
}