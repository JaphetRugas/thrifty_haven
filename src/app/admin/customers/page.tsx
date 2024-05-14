"use client"
 
import {
    Card,
    CardContent, 
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
import { 
    View,
} from "lucide-react"

interface Customer {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/admin/customers')
            .then(response => response.json())
            .then(data => {
                if (data.customers) {
                    setCustomers(data.customers);
                }
            })
            .catch(error => console.error('Error fetching customers:', error))
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
                                    <span className="sr-only">ID</span>
                                    ID
                                </TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Phone Number
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
                                </TableRow>
                            </TableBody>
                        ) : (
                            customers.map((customer) => (
                                <TableBody key={customer.id}>
                                    <TableRow>
                                        <TableCell className="hidden sm:table-cell">
                                            {customer.id}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {customer.firstName} {customer.lastName}
                                        </TableCell> 
                                        <TableCell className="hidden md:table-cell">
                                            {customer.email}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {customer.phoneNumber}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/customers/${customer.id}`}>
                                                <View />
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
