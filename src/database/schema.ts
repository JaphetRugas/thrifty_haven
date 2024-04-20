import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const userTable = pgTable("user_table", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    age: text("age").notNull(),
    birthday: timestamp("birthday", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
    phoneNumber: text("phone_number").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});

export const sessionUserTable = pgTable("user_session", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});
