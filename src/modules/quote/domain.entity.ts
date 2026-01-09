export interface CreateQuoteProps {
    userId: string;
    author: string;
    description: string;
}
export interface QuoteProps extends CreateQuoteProps {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Quote {
    private constructor(private props: QuoteProps) {
        this.validate();
    }

    static create(props: CreateQuoteProps): Quote {
        return new Quote({
            id: crypto.randomUUID(),
            ...props,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    static fromPersistence(props: QuoteProps): Quote {
        return new Quote(props);
    }
    private static readonly AUTHOR_MIN_LENGTH = 3;
    private static readonly DESCRIPTION_MIN_LENGTH = 10;
    private static readonly DESCRIPTION_MAX_LENGTH = 255;

    private validate(): void {


    if (this.props.author.trim().length < Quote.AUTHOR_MIN_LENGTH) {
        throw new Error(`Quote author must be at least ${Quote.AUTHOR_MIN_LENGTH} characters.`);
    }
    if (this.props.description.trim().length < Quote.DESCRIPTION_MIN_LENGTH || this.props.description.trim().length > Quote.DESCRIPTION_MAX_LENGTH) {
        throw new Error(`Quote description must be between ${Quote.DESCRIPTION_MIN_LENGTH} and ${Quote.DESCRIPTION_MAX_LENGTH} characters.`);
    }
}
    
    get id(): string { return this.props.id; }
    
    get userId(): string { return this.props.userId; }
    
    get author(): string { return this.props.author; }
    
    get description(): string { return this.props.description; }
    
    get createdAt(): Date { return this.props.createdAt; }
    
    get updatedAt(): Date { return this.props.updatedAt; }
}
