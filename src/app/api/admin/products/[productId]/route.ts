import db from '@/database';
import { productTable } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from "@/config/cloudinary";
import { generateId } from 'lucia';

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

export async function PUT(request: NextRequest, { params }: Props) {
    const { productId } = params;
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseInt(formData.get('price') as string);
    const quantityAvailable = parseInt(formData.get('quantityAvailable') as string);
    const isActiveValue = formData.get('isActive');
    const isActive = isActiveValue === 'true' ? true : false; 

    if (!name || !description || !price || !quantityAvailable) {
        return NextResponse.json({ message: 'Product name, description, price, and quantity are required' }, { status: 400 });
    }
    let fileUrl: string | undefined;
    const fileImage = formData.get('image') as File;
    if (fileImage.name !== '') {
        const arrayBuffers = await fileImage.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffers);
        const fileData = Buffer.from(buffer);

        if (fileImage.type !== 'image/png' && fileImage.type !== 'image/jpg' && fileImage.type !== 'image/jpeg') {
            return NextResponse.json({ message: 'Image file must be a png or jpg or jpeg' }, { status: 400 });
        }

        const fileExtension = fileImage.type.split('/')[1];
        // Convert the image data to base64
        const fileBase64 = fileData.toString("base64");

        // Make request to upload to Cloudinary
        const result: any = await cloudinary.uploader.upload(
            `data:image/${fileExtension};base64,${fileBase64}`,
            {
                folder: "products",
            }
        );

        fileUrl = result.secure_url;
    } 

    try { 

        const existingProduct = await db.query.productTable.findFirst({
            where: eq(productTable.id, productId)
        })

        if (!existingProduct) {
            return NextResponse.json({ message: 'Failed to find the product' }, { status: 500 });
        }

        const updateValues: any = {
            name,
            description,
            price,
            quantityAvailable,
            isActive,
            updatedAt: new Date(),
        };

        // Update the image URL only if it's provided
        if (fileUrl) {
            updateValues.image = fileUrl;
        }


        const result = await db
            .update(productTable)
            .set(updateValues)
            .where(eq(productTable.id, productId))
            .returning({
                id: productTable.id,
                name: productTable.name,
                description: productTable.description,
                price: productTable.price,
                quantityAvailable: productTable.quantityAvailable,
                image: productTable.image,
                isActive: productTable.isActive,
            });

        if (!result) {
            return NextResponse.json({ message: 'Failed to upload product' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Product uploaded successfully' });
    } catch (error: any) {
        console.error('Error uploading image to Cloud Storage:', error);
    }
}