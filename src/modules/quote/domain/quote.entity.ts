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
    private constructor(private props: QuoteProps) {}

    static create(props: CreateQuoteProps): Quote {
        this.validate(props);
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
    private static readonly AUTHOR_MAX_LENGTH = 100;
    private static readonly DESCRIPTION_MIN_LENGTH = 10;
    private static readonly DESCRIPTION_MAX_LENGTH = 255;

    private static validate(props: CreateQuoteProps): void {

        if (props.author.trim().length < Quote.AUTHOR_MIN_LENGTH || props.author.trim().length > Quote.AUTHOR_MAX_LENGTH) {
            throw new Error(`Quote author must be between ${Quote.AUTHOR_MIN_LENGTH} and ${Quote.AUTHOR_MAX_LENGTH} characters.`);
        }
        if (props.description.trim().length < Quote.DESCRIPTION_MIN_LENGTH || props.description.trim().length > Quote.DESCRIPTION_MAX_LENGTH) {
            throw new Error(`Quote description must be between ${Quote.DESCRIPTION_MIN_LENGTH} and ${Quote.DESCRIPTION_MAX_LENGTH} characters.`);
        }
    }

    changeAuthor(newAuthor: string) {
        if (!newAuthor || newAuthor.trim().length < Quote.AUTHOR_MIN_LENGTH || newAuthor.trim().length > Quote.AUTHOR_MAX_LENGTH) {
            throw new Error(`Author must be between ${Quote.AUTHOR_MIN_LENGTH} and ${Quote.AUTHOR_MAX_LENGTH} characters.`);
        }
        this.props.author = newAuthor.trim();
        this.props.updatedAt = new Date();
    }
    changeDescription(newDescription: string) {
        if (!newDescription || newDescription.trim().length < Quote.DESCRIPTION_MIN_LENGTH || newDescription.trim().length > Quote.DESCRIPTION_MAX_LENGTH) {
            throw new Error(`Description must be between ${Quote.DESCRIPTION_MIN_LENGTH} and ${Quote.DESCRIPTION_MAX_LENGTH} characters.`);
        }
        this.props.description = newDescription.trim();
        this.props.updatedAt = new Date();
    }
    
    get id(): string { return this.props.id; }
    get userId(): string { return this.props.userId; }
    get author(): string { return this.props.author; }
    get description(): string { return this.props.description; }
    get createdAt(): Date { return this.props.createdAt; }
    get updatedAt(): Date { return this.props.updatedAt; }
}
