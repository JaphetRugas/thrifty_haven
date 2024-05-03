import db from '@/database';
import { productTable } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: { productId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { productId } = params;

        const product = await db.query.productTable.findFirst({
            where: eq(productTable.id, productId)
        });

        if (!product) {
            return NextResponse.json(
                { message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        console.error('Error checking product:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}