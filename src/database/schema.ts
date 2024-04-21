import { pgTable, text, timestamp, boolean} from "drizzle-orm/pg-core"; 

export const userTable = pgTable("user_table", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    age: text("age"),
    birthday: timestamp("birthday", {
        withTimezone: true,
        mode: "date"
    }),
    phoneNumber: text("phone_number"),
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
