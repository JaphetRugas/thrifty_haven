"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    image: string;
    isActive: boolean;
}

interface Params {
    productId: string;
}

export default function ProductPage({ params }: { params: Params }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/admin/products/${params.productId}`)
            .then(response => response.json())
            .then(data => {
                if (data.product) {
                    setProduct(data.product);
                }
            })
            .catch(error => console.error('Error fetching product details:', error))
            .finally(() => setLoading(false));
    }, [params.productId]);

    if (loading) {
        return (
            <div className="h-screen bg-white">
                <div className="flex justify-center items-center h-full">
                    <Image className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" width={100} height={100} alt="" />
                </div>
            </div>
        )
    }

    if (!product) {
        return <p>Product not found</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {product.image && (
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-2">{product.description}</p>
                        <p className="text-gray-800 font-semibold mb-2">Price: ₱{product.price}</p>
                        <p className="text-gray-800 font-semibold">Quantity Available: {product.quantityAvailable}</p>
                        <p className="text-gray-800 font-semibold">Status: {product.isActive ? 'Active' : 'Inactive'}</p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-4">Preorders</h3>
                    <ul>
                        <li className="text-gray-800">Preorder 1</li>
                        <li className="text-gray-800">Preorder 2</li>
                        <li className="text-gray-800">Preorder 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
