import { IQuoteRepo } from "../../domain/IQuote.repo";

export class RemoveQuoteAdminUC {
  constructor(private quoteRepo: IQuoteRepo) {}

  async execute(id: string): Promise<void> {
    const quote = await this.quoteRepo.findById(id);
    if (!quote) throw new Error("Quote not found");
    
    await this.quoteRepo.remove(id);
  }
}