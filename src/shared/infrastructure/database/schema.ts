import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['user', 'admin']);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  providerId: text("provider_id").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  image: text("image").notNull(),
  role: roleEnum('role').notNull().default('user'),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
}, (table) => [
  index("users_provider_id_idx").on(table.providerId),
  index('users_role_idx').on(table.role),
])

export const quotes = pgTable("quotes", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  author: text("author").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
}, (table) => [
  index("quotes_user_id_idx").on(table.userId),
])

export const usersRelations = relations(users, ({ many }) => ({
  quotes: many(quotes)
}));
export const quotesRelations = relations(quotes, ({ one }) => ({
  user: one(users, {
    fields: [quotes.userId],
    references: [users.id],
    relationName: 'quotes_user',
  })
}));