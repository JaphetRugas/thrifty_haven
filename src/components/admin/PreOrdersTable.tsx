import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export default function PreOrdersTable() {
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
        </div>
    )
}