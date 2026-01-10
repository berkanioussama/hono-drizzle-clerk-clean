import { Hono } from "hono";
import { UserRepoImpl } from "../../user/infrastructure/user-repo.impl";
import { QuoteRepoImpl } from "../infrastructure/quote-repo.impl";
import { AddQuoteUC } from "../application/usecase/add-quote.uc";
import { EditQuoteUC } from "../application/usecase/edit-quote.uc";
import { FindAllQuotesUC } from "../application/usecase/find-all-quotes.uc";
import { FindQuoteByIdUC } from "../application/usecase/find-quote-by-id.uc";
import { FindQuotesByUserIdUC } from "../application/usecase/find-quotes-by-user-id.uc";
import { RemoveQuoteUC } from "../application/usecase/remove-quote.uc";
import { QuoteController } from "./quote.controller";
import { UserService } from "../../user/application/service/user.service";
import { AuthService } from "../../user/application/service/auth.service";
import { requireAdminAuth } from "../../../shared/api/middlewares/auth.middleware";

export const quoteRoutes = new Hono();

// Repositories
const userRepo = new UserRepoImpl();
const quoteRepo = new QuoteRepoImpl();

// Use Cases
const addQuoteUC = new AddQuoteUC(quoteRepo);
const editQuoteUC = new EditQuoteUC(quoteRepo);
const findAllQuotesUC = new FindAllQuotesUC(quoteRepo);
const findQuoteByIdUC = new FindQuoteByIdUC(quoteRepo);
const findQuotesByUserIdUC = new FindQuotesByUserIdUC(quoteRepo);
const removeQuoteUC = new RemoveQuoteUC(quoteRepo);

// Services
const userService = new UserService(userRepo);
const authService = new AuthService(userRepo);

// Controller
const quoteController = new QuoteController(
  addQuoteUC,
  editQuoteUC,
  findAllQuotesUC,
  findQuoteByIdUC,
  findQuotesByUserIdUC,
  removeQuoteUC,
  userService
);

// Routes
quoteRoutes.post("/", (c) => quoteController.addQuote(c))
quoteRoutes.put("/:id", (c) => quoteController.editQuote(c))
quoteRoutes.get("/:id", (c) => quoteController.findQuoteById(c))
quoteRoutes.get("/user/", (c) => quoteController.findQuotesByUserId(c))
quoteRoutes.delete("/:id", (c) => quoteController.removeQuote(c))

quoteRoutes.use('*', requireAdminAuth(authService));

quoteRoutes.get("/", (c) => quoteController.findAllQuotes(c))

export default quoteRoutes;