import { Context } from "hono";
import { getAuth } from "@hono/clerk-auth";
import { AddQuoteAdminUC,AddQuoteUC } from "../application/usecase/add-quote.uc";
import { EditQuoteAdminUC, EditQuoteUC } from "../application/usecase/edit-quote.uc";
import { FindAllQuotesAdminUC } from "../application/usecase/find-all-quotes.uc";
import { FindQuoteByIdUC, FindQuoteByIdAdminUC } from "../application/usecase/find-quote-by-id.uc";
import { FindQuotesByUserIdAdminUC, FindQuotesByUserIdUC } from "../application/usecase/find-quotes-by-user-id.uc";
import { RemoveQuoteAdminUC, RemoveQuoteUC } from "../application/usecase/remove-quote.uc";
import { successResponse, errorResponse } from "../../../shared/api/utils/api-response";
import { errorHandler } from "../../../shared/api/utils/error-handler";
import { AddQuoteSchema, EditQuoteSchema, EditQuoteAdminSchema } from "./quote.validation";
import { UserService } from "../../user/application/service/user.service";

export class QuoteController {
    constructor(
        private addQuoteAdminUC: AddQuoteAdminUC,
        private addQuoteUC: AddQuoteUC,
        private editQuoteAdminUC: EditQuoteAdminUC,
        private editQuoteUC: EditQuoteUC,
        private findAllQuotesAdminUC: FindAllQuotesAdminUC,
        private findQuoteByIdAdminUC: FindQuoteByIdAdminUC,
        private findQuoteByIdUC: FindQuoteByIdUC,
        private findQuotesByUserIdAdminUC: FindQuotesByUserIdAdminUC,
        private findQuotesByUserIdUC: FindQuotesByUserIdUC,
        private removeQuoteAdminUC: RemoveQuoteAdminUC,
        private removeQuoteUC: RemoveQuoteUC,
        private userService: UserService
    ) {}

    async addQuoteAdmin(c: Context) {
        try {
            const userId = c.req.param("userId");
            const body = AddQuoteSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const quote = await this.addQuoteUC.execute({userId, ...body.data})
            return successResponse(c, 201, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: creating quote"})
        }
    }
    async addQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) return errorResponse(c, 404, "User not found")
            const body = AddQuoteSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const quote = await this.addQuoteUC.execute({userId: user.id, ...body.data})
            return successResponse(c, 201, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: creating quote"})
        }
    }
    
    async editQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) return errorResponse(c, 404, "User not found")
            const id = c.req.param("id");
            const body = EditQuoteSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const quote = await this.editQuoteUC.execute({ id, userId: user.id, ...body.data})
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating quote"})
        }
    }
    async editQuoteAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const body = EditQuoteAdminSchema.safeParse(await c.req.json())
            if(!body.success) return errorResponse(c, 400, "Invalid request data")
            const quote = await this.editQuoteAdminUC.execute({ id, ...body.data})
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: updating quote"})
        }
    }

    async findAllQuotesAdmin(c: Context) {
        try {
            const quotes = await this.findAllQuotesAdminUC.execute()
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes"})
        }
    }

    async findQuoteByIdAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            const quote = await this.findQuoteByIdAdminUC.execute( id )
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quote"})
        }
    }
    async findQuoteById(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const id = c.req.param("id");
            const quote = await this.findQuoteByIdUC.execute({ id, userId: auth.userId })
            return successResponse(c, 200, quote)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quote"})
        }
    }

    async findQuotesByUserIdAdmin(c: Context) {
        try {
            const userId = c.req.param("userId");
            const quotes = await this.findQuotesByUserIdAdminUC.execute(userId)
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes by user"})
        }
    }
    async findQuotesByUserId(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth?.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) return errorResponse(c, 404, "User not found")
            const quotes = await this.findQuotesByUserIdUC.execute({userId: user.id})
            return successResponse(c, 200, quotes)
        } catch (error) {
            return errorHandler({c, error, message: "Server error: getting quotes by user"})
        }
    }

    async removeQuoteAdmin(c: Context) {
        try {
            const id = c.req.param("id");
            await this.removeQuoteAdminUC.execute(id)
            return successResponse(c, 200, "Quote deleted")
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting quote"})
        }
    }
    async removeQuote(c: Context) {
        try {
            const auth = await getAuth(c)
            if(!auth || !auth.userId) return errorResponse(c, 401, "Unauthorized, not connected")
            const user = await this.userService.findUserByProviderId(auth.userId)
            if(!user) return errorResponse(c, 404, "User not found")
            const id = c.req.param("id");
            await this.removeQuoteUC.execute({ id, userId: user.id })
            return successResponse(c, 200, "Quote deleted")
        } catch (error) {
            return errorHandler({c, error, message: "Server error: deleting quote"})
        }
    }
}