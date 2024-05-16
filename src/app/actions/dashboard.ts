"use server"

import db from "@/database"
import { productTable, userTable, userTransaction } from "@/database/schema"
import { eq, count, sum } from "drizzle-orm";

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

export async function getTotalSales() {
    try {
        const totalSales = await db
            .select({ totalSales: sum(userTransaction.total_price) })
            .from(userTransaction)
            .where(eq(userTransaction.status, "Confirmed"));

        return totalSales[0]?.totalSales ?? 0;
    } catch (error) {
        console.error('Error fetching total sales:', error);
        throw new Error('Failed to fetch total sales');
    }
}

export async function getTotalPreorders() {
    try {
        const totalPreorders = await db
            .select({ count: count() })
            .from(userTransaction)

        return totalPreorders;
    } catch (error) {
        console.error('Error fetching total preorders:', error);
        throw new Error('Failed to fetch total preorders');
    }
}