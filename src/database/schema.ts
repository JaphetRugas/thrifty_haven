import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, integer,jsonb,date} from "drizzle-orm/pg-core"; 

export const userTable = pgTable("user_table", {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    isAdmin: boolean("is_admin").default(false).notNull(),
    firstName: text("first_name"),
    lastName: text("last_name"), 
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
 
export const userCart = pgTable("userCart", {
    productID : text("productID"),
    userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
    product_name: text("product_name").notNull(),
    prices:integer("prices").notNull(),
});

export const userTransaction = pgTable("userTransaction",{
    transactionID : text("transactionID").primaryKey().notNull(),
    userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
    date: date("date").notNull(),
    purchase_info: jsonb("purchase_info").notNull(),
    total_price: integer("total_price").notNull(),
    status: text("status").notNull(),
    expected_date : date("expected_date") 
})


export const userRelation = relations(userTable, ({ many }) => ({
    transaction: many(userTransaction)
}));

export const cartRelations = relations(userCart, ({ one,many }) => ({
    cart: one(userTable, {
        fields: [userCart.userId],
        references: [userTable.id],
      }),
}));

export const transactionRelations = relations(userTransaction, ({ one,many }) => ({
    cart: one(userTable, {
        fields: [userTransaction.userId],
        references: [userTable.id],
      }),
}));