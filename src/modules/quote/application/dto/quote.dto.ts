export interface QuoteDTO {
  id: string;
  userId: string;
  author: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AddQuoteDTO = Omit<QuoteDTO, 'id' | 'createdAt' | 'updatedAt'>;

export type EditQuoteDTO =
  Pick<QuoteDTO, 'id' | 'userId'> &
  Partial<Omit<QuoteDTO, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>;

export type FindQuoteDTO = Pick<QuoteDTO, 'id' | 'userId'>;

export type FindQuotesByUserIdDTO = Pick<QuoteDTO, 'userId'>;

export type RemoveQuoteDTO = Pick<QuoteDTO, 'id' | 'userId'>;