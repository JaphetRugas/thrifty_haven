"use client";

import React, { FormEvent, useEffect, useState } from 'react';
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { View } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

interface PurchaseInfo {
  quantity: number;
  productName: string;
}

interface Preorder {
  date: string;
  userId: string;
  transactionID: string;
  purchase_info: PurchaseInfo[];
  total_price: number;
  status: string;
  expected_date: string | null;
  cart: {
    firstName: string | null;
    lastName: string | null;
  };
}

export default function PreOrdersTable() {
  const router = useRouter();
  const [preorders, setPreorders] = useState<Preorder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Preorder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPreorders() {
      try {
        const response = await fetch("/api/admin/preorders");
        const data = await response.json();
        if (response.ok) {
          setPreorders(data.preorders);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to fetch preorders");
      } finally {
        setLoading(false);
      }
    }

    fetchPreorders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedOrder)
    if (!selectedOrder) return;

    const formData = new FormData(event.currentTarget);
    const status = formData.get('status')

    const response = await fetch(`/api/admin/preorders/${selectedOrder.transactionID}`, {
      method: 'PUT',
      body: formData,
    });

    // // Handle response if necessary
    const data = await response.json();  
    if (response.ok) {
      toast.success(data.message);
      setTimeout(() => {
        router.push(`/admin/preorders`) 
      }, 3000);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Preorders</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your products and view their sales performance.</p>
      </div>
      <div className="overflow-x-auto w-full">
        <Tabs className="w-full" defaultValue="all">
          <TabsList className="flex w-full border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="inprogress">In Progress</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preorders.map((order) => (
                    <TableRow key={order.transactionID}>
                      <TableCell className="font-medium">{order.date}</TableCell>
                      <TableCell>{order.cart.firstName} {order.cart.lastName}</TableCell>
                      <TableCell>{order.total_price}</TableCell>
                      <TableCell className={`text-${order.status === "In Progress" ? "yellow" : order.status === "Confirmed" ? "green" : "red"}-500`}>{order.status}</TableCell>
                      <TableCell>
                        <Sheet>
                          <SheetTrigger asChild>
                            <div>
                              <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                <View />
                              </Button>
                            </div>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle>Order Details</SheetTitle>
                              <SheetDescription>
                                Review the details of the preorder. Update the status as needed.
                              </SheetDescription>
                            </SheetHeader>
                            {selectedOrder && (
                              <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">User: </Label>
                                    <span className="col-span-3" >{selectedOrder.cart.firstName} {selectedOrder.cart.lastName}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Expected Payment Date</Label>
                                    <Input value={selectedOrder.expected_date || ''} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Products</Label>
                                    <div className="col-span-3">
                                      <ul className="list-disc ml-5">
                                        {selectedOrder.purchase_info.map((product, index) => (
                                          <li key={index}>{product.productName} (Quantity: {product.quantity})</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                      Order Status
                                    </Label>
                                    <select
                                      id="status"
                                      name="status"
                                      defaultValue={selectedOrder.status}
                                      className="col-span-3"
                                    >
                                      <option value="Confirmed">Confirmed</option>
                                      <option value="In Progress">In Progress</option>
                                      <option value="Cancelled">Cancelled</option>
                                    </select>
                                  </div>
                                </div>
                                <SheetFooter>
                                  <Button type="submit" disabled={selectedOrder?.status !== "In Progress"}>
                                    Save changes
                                  </Button>
                                </SheetFooter>
                              </form>
                            )}
                          </SheetContent>
                        </Sheet>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="inprogress">
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preorders
                    .filter((order) => order.status === "In Progress")
                    .map((order) => (
                      <TableRow key={order.transactionID}>
                        <TableCell className="font-medium">{order.date}</TableCell>
                        <TableCell>{order.cart.firstName} {order.cart.lastName}</TableCell>
                        <TableCell>{order.total_price}</TableCell>
                        <TableCell className="text-yellow-500">{order.status}</TableCell>
                        <TableCell>
                          <Sheet>
                            <SheetTrigger asChild>
                              <div>
                                <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                  <View />
                                </Button>
                              </div>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Order Details</SheetTitle>
                                <SheetDescription>
                                  Review the details of the preorder. Update the status as needed.
                                </SheetDescription>
                              </SheetHeader>
                              {selectedOrder && (
                                <form onSubmit={handleSubmit}>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right">User: </Label>
                                      <span className="col-span-3" >{selectedOrder.cart.firstName} {selectedOrder.cart.lastName}</span>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right">Expected Payment Date</Label>
                                      <Input value={selectedOrder.expected_date || ''} className="col-span-3" readOnly />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label className="text-right">Products</Label>
                                      <div className="col-span-3">
                                        <ul className="list-disc ml-5">
                                          {selectedOrder.purchase_info.map((product, index) => (
                                            <li key={index}>{product.productName} (Quantity: {product.quantity})</li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="status" className="text-right">
                                        Order Status
                                      </Label>
                                      <select
                                        id="status"
                                        name="status"
                                        defaultValue={selectedOrder.status}
                                        className="col-span-3"
                                      >
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Cancelled">Cancelled</option>
                                      </select>
                                    </div>
                                  </div>
                                  <SheetFooter>
                                    <Button type="submit" disabled={selectedOrder?.status !== "In Progress"}>
                                      Save changes
                                    </Button>
                                  </SheetFooter>
                                </form>
                              )} 
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="confirmed">
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preorders
                    .filter((order) => order.status === "Confirmed")
                    .map((order) => (
                      <TableRow key={order.transactionID}>
                        <TableCell className="font-medium">{order.date}</TableCell>
                        <TableCell>{order.cart.firstName} {order.cart.lastName}</TableCell>
                        <TableCell>{order.total_price}</TableCell>
                        <TableCell className="text-green-500">{order.status}</TableCell>
                        <TableCell>
                          <Sheet>
                            <SheetTrigger asChild>
                              <div>
                                <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                  <View />
                                </Button>
                              </div>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Order Details</SheetTitle>
                                <SheetDescription>
                                  Review the details of the preorder. Update the status as needed.
                                </SheetDescription>
                              </SheetHeader>
                              {selectedOrder && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">User: </Label>
                                    <span className="col-span-3" >{selectedOrder.cart.firstName} {selectedOrder.cart.lastName}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Expected Payment Date</Label>
                                    <Input value={selectedOrder.expected_date || ''} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Products</Label>
                                    <div className="col-span-3">
                                      <ul className="list-disc ml-5">
                                        {selectedOrder.purchase_info.map((product, index) => (
                                          <li key={index}>{product.productName} (Quantity: {product.quantity})</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                      Order Status
                                    </Label>
                                    <select
                                      id="status"
                                      value={selectedOrder.status}
                                      onChange={(e) =>
                                        setSelectedOrder({ ...selectedOrder, status: e.target.value })
                                      }
                                      className="col-span-3"
                                      disabled={selectedOrder.status !== "In Progress"}
                                      name="status"
                                    >
                                      <option value="Confirmed" disabled={selectedOrder.status !== "In Progress"}>Confirmed</option>
                                      <option value="In Progress" disabled={selectedOrder.status !== "In Progress"}>In Progress</option>
                                      <option value="Cancelled" disabled={selectedOrder.status !== "In Progress"}>Cancelled</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button type="submit" disabled={selectedOrder?.status !== "In Progress"}>
                                    Save changes
                                  </Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="cancelled">
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>User Name</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preorders
                    .filter((order) => order.status === "Cancelled")
                    .map((order) => (
                      <TableRow key={order.transactionID}>
                        <TableCell className="font-medium">{order.date}</TableCell>
                        <TableCell>{order.cart.firstName} {order.cart.lastName}</TableCell>
                        <TableCell>{order.total_price}</TableCell>
                        <TableCell className="text-red-500">{order.status}</TableCell>
                        <TableCell>
                          <Sheet>
                            <SheetTrigger asChild>
                              <div>
                                <Button variant="outline" onClick={() => setSelectedOrder(order)}>
                                  <View />
                                </Button>
                              </div>
                            </SheetTrigger>
                            <SheetContent>
                              <SheetHeader>
                                <SheetTitle>Order Details</SheetTitle>
                                <SheetDescription>
                                  Review the details of the preorder. Update the status as needed.
                                </SheetDescription>
                              </SheetHeader>
                              {selectedOrder && (
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">User: </Label>
                                    <span className="col-span-3" >{selectedOrder.cart.firstName} {selectedOrder.cart.lastName}</span>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Expected Payment Date</Label>
                                    <Input value={selectedOrder.expected_date || ''} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label className="text-right">Products</Label>
                                    <div className="col-span-3">
                                      <ul className="list-disc ml-5">
                                        {selectedOrder.purchase_info.map((product, index) => (
                                          <li key={index}>{product.productName} (Quantity: {product.quantity})</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                      Order Status
                                    </Label>
                                    <select
                                      id="status"
                                      value={selectedOrder.status}
                                      onChange={(e) =>
                                        setSelectedOrder({ ...selectedOrder, status: e.target.value })
                                      }
                                      className="col-span-3"
                                      disabled={selectedOrder.status !== "In Progress"}
                                      name="status"
                                    >
                                      <option value="Confirmed" disabled={selectedOrder.status !== "In Progress"}>Confirmed</option>
                                      <option value="In Progress" disabled={selectedOrder.status !== "In Progress"}>In Progress</option>
                                      <option value="Cancelled" disabled={selectedOrder.status !== "In Progress"}>Cancelled</option>
                                    </select>
                                  </div>
                                </div>
                              )}
                              <SheetFooter>
                                <SheetClose asChild>
                                  <Button type="submit" disabled={selectedOrder?.status !== "In Progress"}>
                                    Save changes
                                  </Button>
                                </SheetClose>
                              </SheetFooter>
                            </SheetContent>
                          </Sheet>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <ToastContainer />
    </div>
  );
}
