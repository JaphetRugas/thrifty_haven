import db from '@/database';
import { userTransaction, productTable } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: { preordersId: string };
}

interface PurchaseInfo { 
    productName: string;
    quantity: number;
}

export async function PUT(request: NextRequest, { params }: Props) {
    const { preordersId } = params;
    const formData = await request.formData();
    const status = formData.get('status') as string;

    try {
        const transaction = await db.query.userTransaction.findFirst({
            where: eq(userTransaction.transactionID, preordersId)
        });

        if (!transaction) {
            return NextResponse.json({ message: 'Preorder not found' }, { status: 404 });
        }

        if (transaction.status === 'Confirmed') {
            return NextResponse.json({ message: 'Preorder already confirmed' });
        }

        if (transaction.status === 'In Progress') {
            const purchaseInfoArray = transaction.purchase_info as PurchaseInfo[];

            // Check if the quantity available for each product is enough
            for (const item of purchaseInfoArray) {
                const product = await db.query.productTable.findFirst({
                    where: eq(productTable.name, item.productName)
                });

                if (!product || product.quantityAvailable < item.quantity) {
                    return NextResponse.json({ message: `Not enough quantity available for product: ${item.productName}` }, { status: 400 });
                }

                // Subtract the quantity bought from the available quantity
                await db
                    .update(productTable)
                    .set({
                        quantityAvailable: product.quantityAvailable - item.quantity
                    })
                    .where(eq(productTable.name, item.productName))
                    .execute();
            }

            // Update the status of the transaction
            const result = await db
                .update(userTransaction)
                .set({ status: status })
                .where(eq(userTransaction.transactionID, preordersId))
                .returning({
                    id: userTransaction.transactionID,
                });

            if (!result) {
                return NextResponse.json({ message: 'Failed to update preorder status' }, { status: 500 });
            }

            return NextResponse.json({ message: 'Preorder confirmed successfully' });
        } else {
            return NextResponse.json({ message: 'Invalid status for updating preorder' }, { status: 400 });
        }
    } catch (error: any) {
        console.error('Error confirmation of preorder:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
