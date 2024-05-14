import { validateRequest } from '@/database/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getActiveProductCount, getTotalCustomers } from '@/app/actions/dashboard';

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
        const totalActiveProducts = await getActiveProductCount();
        const totalCustomers = await getTotalCustomers(); 

        return NextResponse.json({ totalActiveProducts, totalCustomers });
    } catch (error: any) {
        console.error('Error retrieving dashboard data:', error);
        return NextResponse.json({ message: 'Failed to retrieve dashboard data' }, { status: 500 });
    }
} 