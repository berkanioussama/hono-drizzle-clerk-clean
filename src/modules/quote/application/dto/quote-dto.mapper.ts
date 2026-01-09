import { Quote } from "../../domain/quote.entity";
import { QuoteDTO } from "./quote.dto";

export class QuoteDTOMapper {
  static toDTO(quote: Quote): QuoteDTO {
    return {
      id: quote.id,
      userId: quote.userId,
      author: quote.author,
      description: quote.description,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
    };
  }

  static toDTOList(quotes: Quote[]): QuoteDTO[] {
    return quotes.map(quote => this.toDTO(quote));
  }
}