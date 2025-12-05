
import { int, mysqlTable, varchar ,timestamp } from "drizzle-orm/mysql-core";

export const shortLink = mysqlTable("short_link", {
  id: int("id").autoincrement().primaryKey(),
  rawUrl: varchar("rawUrl", { length: 255 }).notNull(),
  shortCode: varchar("shortCode", { length: 20 }).notNull().unique(),
});

export const userTable = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

