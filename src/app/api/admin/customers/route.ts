import { validateRequest } from '@/database/auth';
import { NextRequest, NextResponse } from 'next/server';
import db from "@/database"
import { userTable } from "@/database/schema" 
import { eq } from 'drizzle-orm';

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
        const customers = await db.query.userTable.findMany({
            where: eq(userTable.isAdmin, false)
        }); 

        return NextResponse.json({ customers });
    } catch (error: any) {
        console.error('Error retrieving customers:', error);
        return NextResponse.json({ message: 'Failed to retrieve customers' }, { status: 500 });
    }
} 