import { z } from "zod";

export const QuoteSchema = z.object({
  id: z.string().min(1, { message: "ID must be at least 1 character." }),
  userId: z.string().min(1, { message: "User ID must be at least 1 character." }),
  author: z.string().min(3, { message: "Author must be at least 3 characters." }).max(100, { message: "Author must not exceed 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(255, { message: "Description must not exceed 255 characters." }),
  createdAt: z.string().transform(str => new Date(str)),
  updatedAt: z.string().transform(str => new Date(str)),
});

/*-----*****-----*/
export const AddQuoteSchema = QuoteSchema.omit({ id: true, userId: true, createdAt: true, updatedAt: true });
/*-----*****-----*/
export const EditQuoteSchema = QuoteSchema.omit({ id: true, userId: true, createdAt: true, updatedAt: true });