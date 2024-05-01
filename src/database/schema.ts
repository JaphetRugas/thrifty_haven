import { pgTable, text, timestamp, boolean, integer} from "drizzle-orm/pg-core"; 

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

export const productTable = pgTable("product_table", {
    id: text("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    price: integer("price").notNull(), 
    quantityAvailable: integer("quantity_available").notNull(), 
    image: text("image_url"),  
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
    updatedAt: timestamp("updated_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});