import { IQuoteRepo } from "../../domain/IQuote.repo";
import { RemoveQuoteDTO } from "../dto/quote.dto";

export class RemoveQuoteUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute({id, userId}: RemoveQuoteDTO): Promise<void> {
    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new Error("Quote not found");
    if (quote.userId !== userId) throw new Error("Unauthorized to remove this quote");
    await this.quoteRepo.remove(id);
  }
}