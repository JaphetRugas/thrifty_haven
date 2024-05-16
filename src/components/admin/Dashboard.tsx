"use client"
import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useState, useEffect } from 'react';

interface Transaction {
    date: string;
    transactionID: string;
    status: string;
    total_price: number;
    cart: {
        email: string;
        firstName: string | null;
        lastName: string | null;
    };
}

interface DashboardData {
    totalSales: string;
    totalActiveProducts: {
        count: number;
    }[];
    totalPreorders: {
        count: number;
    }[];
    totalCustomers: {
        count: number;
    }[];
    recentTransactions: Transaction[];
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/admin');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!dashboardData) {
        return null;
    }

    return (<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Sales
                    </CardTitle>
                    <span className="h-4 w-4 text-muted-foreground" >₱</span>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₱{dashboardData.totalSales}</div>
                    <p className="text-xs text-muted-foreground">
                        Total Sales
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Customers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{dashboardData.totalCustomers[0].count}</div>
                    <p className="text-xs text-muted-foreground">
                        Total Customers
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Preorders</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{dashboardData.totalPreorders[0].count}</div>
                    <p className="text-xs text-muted-foreground">
                        Total Preorders
                    </p>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{dashboardData?.totalActiveProducts?.[0]?.count}</div>
                    <p className="text-xs text-muted-foreground">
                        Total active products
                    </p>
                </CardContent>
            </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card
                className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
            >
                <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Recent transactions.
                        </CardDescription>
                    </div>
                    <Button asChild size="sm" className="ml-auto gap-1">
                        <Link href="/admin/preorders">
                            View All
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Customer
                                </TableHead>
                                <TableHead>
                                    Status
                                </TableHead>
                                <TableHead>
                                    Date
                                </TableHead>
                                <TableHead>
                                    Amount
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dashboardData.recentTransactions.map(transaction => (
                                <TableRow key={transaction.transactionID}>
                                    <TableCell>
                                        <div className="font-medium">{transaction.cart.firstName} {transaction.cart.lastName}</div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {transaction.cart.email}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="text-xs" variant="outline">
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                    <TableCell>{transaction.total_price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-5">
                <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8"> 
                    {dashboardData.recentTransactions
                        .filter(transaction => transaction.status === "Confirmed")
                        .map(transaction => (
                            <div key={transaction.transactionID} className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src={`/avatars/${transaction.transactionID}.png`} alt="Avatar" />
                                    <AvatarFallback>{transaction.cart.firstName?.charAt(0).toUpperCase()}{transaction.cart.lastName?.charAt(0).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        {transaction.cart.firstName} {transaction.cart.lastName}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {transaction.cart.email}
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+₱{transaction.total_price.toFixed(2)}</div>
                            </div>
                        ))}
                </CardContent>
            </Card>
        </div>
    </main>
    );
}
