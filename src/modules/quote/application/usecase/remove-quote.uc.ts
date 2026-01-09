import { IQuoteRepo } from "../../domain/IQuote.repo";
import { RemoveQuoteDTO } from "../dto/quote.dto";

export class RemoveQuoteUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute({id}: RemoveQuoteDTO): Promise<void> {
    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new Error("Quote not found");

    await this.quoteRepo.remove(id);
  }
}