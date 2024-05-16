import { validateRequest } from '@/database/auth';
import { NextRequest, NextResponse } from 'next/server';
import db from "@/database" 

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
        const preorders = await db.query.userTransaction.findMany({
            with: {
                cart: {
                    columns: {
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        });

        return NextResponse.json({ preorders });
    } catch (error: any) {
        console.error('Error retrieving preorders:', error);
        return NextResponse.json({ message: 'Failed to retrieve preorders' }, { status: 500 });
    }
} 