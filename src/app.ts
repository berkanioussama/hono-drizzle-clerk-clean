import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { compress } from '@hono/bun-compress'

import userRoutes, { userRoutesAdmin } from "./modules/user/api/user.routes";
import quoteRoutes, { adminQuoteRoutes } from "./modules/quote/api/quote.routes";
import { limiter } from "./shared/api/middlewares/rate-limiter.middleware";
import { requireAuth } from "./shared/api/middlewares/auth.middleware"
import clerkWebhook from "./modules/user/api/user.webhook"

const app = new Hono();

app.use(secureHeaders())
app.use(logger())
app.use(compress())

app.route('/api/v1/webhook/clerk', clerkWebhook);

app.use("*",cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}))
app.use("*", clerkMiddleware())
app.use("*", requireAuth())
app.use("*", limiter)

app.route("/api/v1/users", userRoutes);
app.route("/api/v1/admin/users", userRoutesAdmin);
app.route("/api/v1/quotes", quoteRoutes);
app.route("/api/v1/admin/quotes", adminQuoteRoutes);

app.get("/", (c) => c.json({ message: "API is running..." }))
app.notFound((c) => { return c.json({ message: 'No route found' }, 404) })

export default app;
