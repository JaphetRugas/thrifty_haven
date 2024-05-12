'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Menu,
    Package2,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import LogOutBtn from "@/components/admin/LogOutBtn";

function AdminNavigation({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname()
    return (
        <>
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Thrify Haven</span>
                    </Link>
                    <Link
                        href="/admin/dashboard" 
                        className={`${pathname === '/admin/dashboard' ? 'text-foreground transition-colors hover:text-foreground' : 'text-muted-foreground transition-colors hover:text-foreground'}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`${pathname === '/admin/products' ? 'text-foreground transition-colors hover:text-foreground' : 'text-muted-foreground transition-colors hover:text-foreground'}`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/admin/preorders"
                        className={`${pathname === '/admin/preorders' ? 'text-foreground transition-colors hover:text-foreground' : 'text-muted-foreground transition-colors hover:text-foreground'}`}
                    >
                        Preorders
                    </Link>
                    <Link
                        href="/admin/customers"
                        className={`${pathname === '/admin/customers' ? 'text-foreground transition-colors hover:text-foreground' : 'text-muted-foreground transition-colors hover:text-foreground'}`}
                    >
                        Customers
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Thrify Haven</span>
                            </Link>
                            <Link href="/admin/dashboard" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="/admin/products"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="/admin/preorders"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Preorders
                            </Link>
                            <Link
                                href="/admin/customers"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <div className="ml-auto flex-1 sm:flex-initial">
                        <div className="relative">
                            <LogOutBtn />
                        </div>
                    </div> 
                </div>
            </header>
            {children}
        </>
    );
}

export default AdminNavigation;