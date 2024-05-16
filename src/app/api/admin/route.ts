import { validateRequest } from '@/database/auth';
import db from "@/database"
import { NextRequest, NextResponse } from 'next/server';
import { getActiveProductCount, getTotalCustomers, getTotalPreorders, getTotalSales } from '@/app/actions/dashboard';

export async function GET(req: NextRequest) {
    // Commented Out for api demonstration
    // const { user } = await validateRequest();
    // const userType = user?.isAdmin; 

    // if (!user) {
    //     return NextResponse.redirect("/admin/sign-in");
    // }

    // if (!userType) {
    //     return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    //     console.log("Unauthorized")
    // }
    try {
        const totalSales = await getTotalSales();
        const totalActiveProducts = await getActiveProductCount();
        const totalPreorders = await getTotalPreorders();
        const totalCustomers = await getTotalCustomers();

        const recentTransactions = await db.query.userTransaction.findMany({ 
            limit: 5,
            columns: {
                transactionID: true,
                date: true,
                status: true,
                total_price: true,
            },
            with: {
                cart: {
                    columns: {
                        firstName: true,
                        lastName: true,
                        email: true,
                    }
                }
            },
            orderBy: (userTransaction, { asc }) => [asc(userTransaction.date)], 
        })

        return NextResponse.json({ totalSales, totalActiveProducts, totalPreorders, totalCustomers, recentTransactions });
    } catch (error: any) {
        console.error('Error retrieving dashboard data:', error);
        return NextResponse.json({ message: 'Failed to retrieve dashboard data' }, { status: 500 });
    }
} 