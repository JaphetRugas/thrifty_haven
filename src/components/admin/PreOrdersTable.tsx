"use client";

import { useState } from "react";
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

const mockData = [
  {
    id: 1,
    product: "Acme Hover Scooter",
    releaseDate: "2023-06-15",
    quantityOrdered: 124,
    orderStatus: "Pending",
    user: "John Doe",
    expectedPaymentDate: "2023-06-20",
    products: ["Hover Scooter", "Helmet", "Battery Pack"],
  },
  {
    id: 2,
    product: "Fusion Fitness Tracker",
    releaseDate: "2023-10-01",
    quantityOrdered: 154,
    orderStatus: "Pending",
    user: "Jane Smith",
    expectedPaymentDate: "2023-10-05",
    products: ["Fitness Tracker", "Charging Cable"],
  },
  {
    id: 3,
    product: "Quantum Headphones",
    releaseDate: "2023-07-01",
    quantityOrdered: 89,
    orderStatus: "Fulfilled",
    user: "Alice Johnson",
    expectedPaymentDate: "2023-07-05",
    products: ["Headphones", "Case", "Charger"],
  },
  {
    id: 4,
    product: "Eco-Friendly Planter",
    releaseDate: "2023-09-15",
    quantityOrdered: 67,
    orderStatus: "Fulfilled",
    user: "Bob Brown",
    expectedPaymentDate: "2023-09-20",
    products: ["Planter", "Soil Mix", "Seeds"],
  },
  {
    id: 5,
    product: "Lumina Smart Lamp",
    releaseDate: "2023-08-01",
    quantityOrdered: 212,
    orderStatus: "Backordered",
    user: "Carol White",
    expectedPaymentDate: "2023-08-05",
    products: ["Smart Lamp", "Power Adapter"],
  },
  {
    id: 6,
    product: "Acme Hover Scooter",
    releaseDate: "2023-06-15",
    quantityOrdered: 124,
    orderStatus: "Backordered",
    user: "David Green",
    expectedPaymentDate: "2023-06-20",
    products: ["Hover Scooter", "Helmet", "Battery Pack"],
  },
];

export default function PreOrdersTable() {
  const [selectedOrder, setSelectedOrder] = useState(null);

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
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.product}</TableCell>
                      <TableCell>{order.releaseDate}</TableCell>
                      <TableCell>{order.quantityOrdered}</TableCell>
                      <TableCell className={`text-${order.orderStatus === "Pending" ? "yellow" : order.orderStatus === "Fulfilled" ? "green" : "red"}-500`}>{order.orderStatus}</TableCell>
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
                                  <Label className="text-right">User</Label>
                                  <Input value={selectedOrder.user} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Expected Payment Date</Label>
                                  <Input value={selectedOrder.expectedPaymentDate} className="col-span-3" readOnly />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label className="text-right">Products</Label>
                                  <div className="col-span-3">
                                    <ul className="list-disc ml-5">
                                      {selectedOrder.products.map((product, index) => (
                                        <li key={index}>{product}</li>
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
                                    value={selectedOrder.orderStatus}
                                    onChange={(e) =>
                                      setSelectedOrder({ ...selectedOrder, orderStatus: e.target.value })
                                    }
                                    className="col-span-3"
                                    disabled={selectedOrder.orderStatus !== "Pending"}
                                  >
                                    <option value="Fulfilled" disabled={selectedOrder.orderStatus !== "Pending"}>Fulfilled</option>
                                    <option value="Pending" disabled={selectedOrder.orderStatus !== "Pending"}>Pending</option>
                                    <option value="Backordered" disabled={selectedOrder.orderStatus !== "Pending"}>Backordered</option>
                                  </select>
                                </div>
                              </div>
                            )}
                            <SheetFooter>
                              <SheetClose asChild>
                              <Button type="submit" disabled={selectedOrder?.orderStatus !== "Pending"}>
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
                  {mockData
                    .filter((order) => order.orderStatus === "Fulfilled")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.product}</TableCell>
                        <TableCell>{order.releaseDate}</TableCell>
                        <TableCell>{order.quantityOrdered}</TableCell>
                        <TableCell className="text-green-500">{order.orderStatus}</TableCell>
                      </TableRow>
                    ))}
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
                  {mockData
                    .filter((order) => order.orderStatus === "Pending")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.product}</TableCell>
                        <TableCell>{order.releaseDate}</TableCell>
                        <TableCell>{order.quantityOrdered}</TableCell>
                        <TableCell className="text-yellow-500">{order.orderStatus}</TableCell>
                      </TableRow>
                    ))}
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
                  {mockData
                    .filter((order) => order.orderStatus === "Backordered")
                    .map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.product}</TableCell>
                        <TableCell>{order.releaseDate}</TableCell>
                        <TableCell>{order.quantityOrdered}</TableCell>
                        <TableCell className="text-red-500">{order.orderStatus}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
