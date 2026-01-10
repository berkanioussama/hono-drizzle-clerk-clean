import { Hono } from "hono";
import { UserRepoImpl } from "../../user/infrastructure/user-repo.impl";
import { QuoteRepoImpl } from "../infrastructure/quote-repo.impl";
import { AddQuoteAdminUC, AddQuoteUC } from "../application/usecase/add-quote.uc";
import { EditQuoteAdminUC, EditQuoteUC } from "../application/usecase/edit-quote.uc";
import { FindAllQuotesAdminUC } from "../application/usecase/find-all-quotes.uc";
import { FindQuoteByIdAdminUC, FindQuoteByIdUC } from "../application/usecase/find-quote-by-id.uc";
import { FindQuotesByUserIdAdminUC, FindQuotesByUserIdUC } from "../application/usecase/find-quotes-by-user-id.uc";
import { RemoveQuoteAdminUC, RemoveQuoteUC } from "../application/usecase/remove-quote.uc";
import { QuoteController } from "./quote.controller";
import { UserService } from "../../user/application/service/user.service";
import { AuthService } from "../../user/application/service/auth.service";
import { requireAdminAuth } from "../../../shared/api/middlewares/auth.middleware";

export const quoteRoutes = new Hono();
export const adminQuoteRoutes = new Hono();

// Repositories
const userRepo = new UserRepoImpl();
const quoteRepo = new QuoteRepoImpl();

// Use Cases
const addQuoteAdminUC = new AddQuoteAdminUC(quoteRepo);
const addQuoteUC = new AddQuoteUC(quoteRepo);
const editQuoteAdminUC = new EditQuoteAdminUC(quoteRepo);
const editQuoteUC = new EditQuoteUC(quoteRepo);
const findAllQuotesAdminUC = new FindAllQuotesAdminUC(quoteRepo);
const findQuoteByIdAdminUC = new FindQuoteByIdAdminUC(quoteRepo);
const findQuoteByIdUC = new FindQuoteByIdUC(quoteRepo);
const findQuotesByUserIdAdminUC = new FindQuotesByUserIdAdminUC(quoteRepo);
const findQuotesByUserIdUC = new FindQuotesByUserIdUC(quoteRepo);
const removeQuoteAdminUC = new RemoveQuoteAdminUC(quoteRepo);
const removeQuoteUC = new RemoveQuoteUC(quoteRepo);

// Services
const userService = new UserService(userRepo);
const authService = new AuthService(userRepo);

// Controller
const quoteController = new QuoteController(
  addQuoteAdminUC, addQuoteUC,
  editQuoteAdminUC, editQuoteUC,
  findAllQuotesAdminUC,
  findQuoteByIdAdminUC, findQuoteByIdUC,
  findQuotesByUserIdAdminUC, findQuotesByUserIdUC,
  removeQuoteAdminUC, removeQuoteUC,
  userService
);

// Routes
quoteRoutes.post("/", (c) => quoteController.addQuote(c))
quoteRoutes.put("/:id", (c) => quoteController.editQuote(c))
quoteRoutes.get("/:id", (c) => quoteController.findQuoteById(c))
quoteRoutes.get("/user/", (c) => quoteController.findQuotesByUserId(c))
quoteRoutes.delete("/:id", (c) => quoteController.removeQuote(c))

// Admin Routes
adminQuoteRoutes.use('*', requireAdminAuth(authService));
adminQuoteRoutes.post("/:userId", (c) => quoteController.addQuoteAdmin(c))
adminQuoteRoutes.put("/:id", (c) => quoteController.editQuoteAdmin(c))
adminQuoteRoutes.get("/", (c) => quoteController.findAllQuotesAdmin(c))
adminQuoteRoutes.get("/:id", (c) => quoteController.findQuoteByIdAdmin(c))
adminQuoteRoutes.get("/:userId", (c) => quoteController.findQuotesByUserIdAdmin(c))
adminQuoteRoutes.delete("/:id", (c) => quoteController.removeQuoteAdmin(c))

export default quoteRoutes