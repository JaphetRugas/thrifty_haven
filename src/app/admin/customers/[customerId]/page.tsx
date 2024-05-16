"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image"
import {
    ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import "react-toastify/dist/ReactToastify.css";

interface Product {
    productName: string;
    quantity: number;
}

interface Order {
    id: string;
    purchase_info: Product[];
    date: string;
    status: string;
}

interface CustomerOrders {
    id: string;
    firstName: string;
    lastName: string;
    transaction: Order[];
}

interface Params {
    customerId: string;
}

export default function CustomerPage({ params }: { params: Params }) {
    const router = useRouter()
    const [customerOrders, setCustomerOrders] = useState<CustomerOrders | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/admin/customers/${params.customerId}`)
            .then(response => response.json())
            .then(data => {
                if (data.userOrders) {
                    setCustomerOrders(data.userOrders);
                }
            })
            .catch(error => console.error('Error fetching product details:', error))
            .finally(() => setLoading(false));
    }, [params.customerId]);


    console.log(customerOrders)
    if (loading) {
        return (
            <div className="h-screen bg-white">
                <div className="flex justify-center items-center h-full">
                    <Image className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" width={100} height={100} alt="" />
                </div>
            </div>
        )
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'In Progress':
                return 'text-yellow-500';
            case 'Confirmed':
                return 'text-green-500';
            case 'Cancelled':
                return 'text-red-500';
            default:
                return '';
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="gap-4">
                <div className="flex items-center gap-4 mb-5">
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.push('/admin/customers')}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                    </Button>
                    <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                        {customerOrders?.firstName}
                    </h1>
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <div className="overflow-x-auto w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity Ordered</TableHead>
                                <TableHead>Release Date</TableHead>
                                <TableHead>Order Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customerOrders?.transaction.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.purchase_info.map(product => product.productName).join(', ')}</TableCell>
                                    <TableCell>{order.purchase_info.map(product => product.quantity).reduce((acc, qty) => acc + qty, 0)}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell className={getStatusColor(order.status)}>{order.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    )
}
