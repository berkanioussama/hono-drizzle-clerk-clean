import { IQuoteRepo } from "../../domain/IQuote.repo";
import { EditQuoteDTO, QuoteDTO } from "../dto/quote.dto";
import { QuoteDTOMapper } from "../dto/quote-dto.mapper";

export class EditQuoteAdminUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(input: EditQuoteDTO): Promise<QuoteDTO> {
        const quote = await this.quoteRepo.findById(input.id);
        if (!quote) throw new Error("Quote not found")
        
        if (input.author) {
        quote.changeAuthor(input.author)
        }
        
        if (input.description) {
        quote.changeDescription(input.description)
        }

        const updatedQuote = await this.quoteRepo.edit(quote)

        return QuoteDTOMapper.toDTO(updatedQuote)
    }
}

export class EditQuoteUC {
    constructor(private quoteRepo: IQuoteRepo) {}

    async execute(input: EditQuoteDTO): Promise<QuoteDTO> {
        const quote = await this.quoteRepo.findById(input.id);
        if (!quote) throw new Error("Quote not found")
        
        if (quote.userId !== input.userId) {
        throw new Error("Unauthorized to edit this quote")
        }
        
        if (input.author) {
        quote.changeAuthor(input.author)
        }
        
        if (input.description) {
        quote.changeDescription(input.description)
        }

        const updatedQuote = await this.quoteRepo.edit(quote)

        return QuoteDTOMapper.toDTO(updatedQuote)
    }
}