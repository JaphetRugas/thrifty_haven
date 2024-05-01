import { validateRequest } from '@/database/auth';
import { NextRequest, NextResponse } from 'next/server';
import db from "@/database"
import { productTable } from "@/database/schema"
import { generateId } from "lucia"
import cloudinary from "@/config/cloudinary";

export async function POST(req: NextRequest) {
    const { user } = await validateRequest();
    const userType = user?.isAdmin;

    if (!user) {
        return NextResponse.redirect("/admin/sign-in");
    }

    if (!userType) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string; 
    const price = parseInt(formData.get('price') as string);
    const quantityAvailable = parseInt(formData.get('quantityAvailable') as string);

    if (!name || !description || !price || !quantityAvailable) {
        return NextResponse.json({ message: 'Product name, description, price, and quantity are required' }, { status: 400 });
    }
    const fileImage = formData.get('image') as File;
    const arrayBuffers = await fileImage.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffers);
    const fileData = Buffer.from(buffer);


    if (fileImage.type !== 'image/png' && fileImage.type !== 'image/jpg') {
        return NextResponse.json({ message: 'Image file must be a png or jpg' }, { status: 400 });
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

    const fileUrl = result.secure_url;

    try {
        const productId = generateId(15)

        if (!fileUrl) {
            return NextResponse.json({ message: 'Failed to upload image file' }, { status: 500 });
        }

        const result = await db
            .insert(productTable)
            .values({
                id: productId,
                name: name,
                description: description,
                price: price,
                quantityAvailable: quantityAvailable,
                image: fileUrl,
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            .returning({
                id: productTable.id,
                name: productTable.name,
                description: productTable.description,
                price: productTable.price,
                quantityAvailable: productTable.quantityAvailable,
                image: productTable.image,
                isActive: productTable.isActive,
            })

        if (!result) {
            return NextResponse.json({ message: 'Failed to upload certificate' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Product uploaded successfully' });
    } catch (error: any) {
        console.error('Error uploading image to Cloud Storage:', error);
    }
}

