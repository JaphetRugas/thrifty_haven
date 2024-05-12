"use client"
 
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription, 
} from "@/components/ui/card" 
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@/components/ui/button"
import {
    PlusCircle, 
    PencilRuler,
} from "lucide-react"

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    image: string;
    isActive: boolean;
}

export default function Customers() {
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
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Customers</h1> 
            </div>

            <Card x-chunk="dashboard-06-chunk-0">
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                    <span className="sr-only">Image</span>
                                    Image
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Price
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Quantity Available
                                </TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        {loading ? (
                            <TableBody>
                                <TableRow> 
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-5 w-24" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        ) : (
                            products.map((product) => (
                                <TableBody key={product.id}>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">
                                            {product.image && (
                                                <img src={product.image} alt={product.name} />
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.isActive ? 'Active' : 'Inactive'}</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            ₱{product.price}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.quantityAvailable}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/products/${product.id}`}>
                                                <PencilRuler />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))
                        )}
                    </Table>
                </CardContent>
            </Card>
        </div >
    );
}
