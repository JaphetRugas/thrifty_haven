"use server"

import db from "@/database"
import { productTable, userTable } from "@/database/schema"
import { eq, count } from "drizzle-orm";

export async function getActiveProductCount() { 

    const activeProductCount = await db
        .select({ count: count() })
        .from(productTable)
        .where(eq(productTable.isActive, true));

    return activeProductCount;
}

export async function getTotalCustomers() { 

    const totalCustomers = await db
        .select({ count: count() })
        .from(userTable)
        .where(eq(userTable.isAdmin, false));

    return totalCustomers;
}
