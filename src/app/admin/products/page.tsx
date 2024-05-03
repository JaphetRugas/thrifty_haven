"use client"
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Skeleton from "@mui/material/Skeleton";
import { Card } from "@mui/material";


interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    image: string;
    isActive: boolean;
}

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/admin/products')
            .then(response => response.json())
            .then(data => {
                if (data.products) {
                    setProducts(data.products);
                }
            })
            .catch(error => console.error('Error fetching products:', error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <Link href="/admin/addProduct" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
                    Add New Product
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {loading ? (
                    <>
                        {[...Array(6)].map((_, index) => (
                            <Card key={index} className="w-full space-y-5 p-4">
                                <Skeleton variant="rectangular" width="100%" height={300} />
                                <div className="space-y-3">
                                    <Skeleton className="w-3/5" height={20} />
                                    <Skeleton className="w-4/5" height={20} />
                                    <Skeleton className="w-2/5" height={20} />
                                </div>
                            </Card>
                        ))}
                    </>
                ) : (
                    products.map((product) => (

                        <Link key={product.id} href={`/admin/products/${product.id}`} className="hover:underline">
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
