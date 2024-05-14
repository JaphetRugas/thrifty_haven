
import React from 'react'

export default function page() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Order Status</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status">Order Status</Label>
                        <select
                            id="status"
                            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:border-blue-500 col-span-3"
                        >
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Pending">Pending</option>
                            <option value="Backordered">Backordered</option>
                        </select>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose>
                        <Button>Cancel</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
