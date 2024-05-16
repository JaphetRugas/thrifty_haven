import db from '@/database';
import { userTable } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server'; 

interface Props {
    params: { customerId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { customerId } = params; 

        const userOrders = await db.query.userTable.findFirst({
            where: eq(userTable.id, customerId),
            with: {
                transaction: true
            }
        });

        if (!userOrders) {
            return NextResponse.json(
                { message: 'User Orders not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ userOrders }, { status: 200 });
    } catch (error) {
        console.error('Error checking user orders:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}