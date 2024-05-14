'use client'

import React, { useEffect, useState } from 'react';
import Image from "next/image"
import {
    ChevronLeft, 
} from "lucide-react" 
import { Button } from "@/components/ui/button" 
import { useRouter } from 'next/navigation' 
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import "react-toastify/dist/ReactToastify.css";

interface CustomerOrders {
    id: string;
    firstName: string;
    lastName: string;
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
                <Tabs className="w-full" defaultValue="all">
                    <TabsList className="flex w-full border-b border-gray-200 dark:border-gray-800">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="backordered">Backordered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Release Date</TableHead>
                                        <TableHead>Quantity Ordered</TableHead>
                                        <TableHead>Order Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Acme Hover Scooter</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>124</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantum Headphones</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>89</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Lumina Smart Lamp</TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>212</TableCell>
                                        <TableCell className="text-red-500">Backordered</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Eco-Friendly Planter</TableCell>
                                        <TableCell>2023-09-15</TableCell>
                                        <TableCell>67</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Fusion Fitness Tracker</TableCell>
                                        <TableCell>2023-10-01</TableCell>
                                        <TableCell>154</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Acme Hover Scooter</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>124</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantum Headphones</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>89</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Lumina Smart Lamp</TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>212</TableCell>
                                        <TableCell className="text-red-500">Backordered</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Eco-Friendly Planter</TableCell>
                                        <TableCell>2023-09-15</TableCell>
                                        <TableCell>67</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Fusion Fitness Tracker</TableCell>
                                        <TableCell>2023-10-01</TableCell>
                                        <TableCell>154</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Acme Hover Scooter</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>124</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantum Headphones</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>89</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Lumina Smart Lamp</TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>212</TableCell>
                                        <TableCell className="text-red-500">Backordered</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Eco-Friendly Planter</TableCell>
                                        <TableCell>2023-09-15</TableCell>
                                        <TableCell>67</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Fusion Fitness Tracker</TableCell>
                                        <TableCell>2023-10-01</TableCell>
                                        <TableCell>154</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Acme Hover Scooter</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>124</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantum Headphones</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>89</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Lumina Smart Lamp</TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>212</TableCell>
                                        <TableCell className="text-red-500">Backordered</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Eco-Friendly Planter</TableCell>
                                        <TableCell>2023-09-15</TableCell>
                                        <TableCell>67</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Fusion Fitness Tracker</TableCell>
                                        <TableCell>2023-10-01</TableCell>
                                        <TableCell>154</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    <TabsContent value="fulfilled">
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Release Date</TableHead>
                                        <TableHead>Quantity Ordered</TableHead>
                                        <TableHead>Order Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Acme Hover Scooter</TableCell>
                                        <TableCell>2023-06-15</TableCell>
                                        <TableCell>124</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Eco-Friendly Planter</TableCell>
                                        <TableCell>2023-09-15</TableCell>
                                        <TableCell>67</TableCell>
                                        <TableCell className="text-green-500">Fulfilled</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    <TabsContent value="pending">
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Release Date</TableHead>
                                        <TableHead>Quantity Ordered</TableHead>
                                        <TableHead>Order Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Quantum Headphones</TableCell>
                                        <TableCell>2023-07-01</TableCell>
                                        <TableCell>89</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">Fusion Fitness Tracker</TableCell>
                                        <TableCell>2023-10-01</TableCell>
                                        <TableCell>154</TableCell>
                                        <TableCell className="text-yellow-500">Pending</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                    <TabsContent value="backordered">
                        <div className="overflow-x-auto w-full">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Release Date</TableHead>
                                        <TableHead>Quantity Ordered</TableHead>
                                        <TableHead>Order Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">Lumina Smart Lamp</TableCell>
                                        <TableCell>2023-08-01</TableCell>
                                        <TableCell>212</TableCell>
                                        <TableCell className="text-red-500">Backordered</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    )
}
