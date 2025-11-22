import { rateLimiter } from "hono-rate-limiter";

export const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 30,
  message: "Too many requests, slow down.",
  keyGenerator: (c) => "<unique_key>",
});
