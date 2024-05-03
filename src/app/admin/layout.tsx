import Link from "next/link";
import { signOut } from "../actions/admin.auth.actions";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>

                <nav className="bg-gray-900 text-white p-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div>
                            <Link href="/admin" className="text-xl font-bold">
                                Thrifty Haven - Admin
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link href="/admin/products" className="mr-4 hover:underline">
                                Products
                            </Link>
                            <Link href="/admin/preorders" className="mr-4 hover:underline">
                                Preorders
                            </Link>
                            <form action={signOut} className="inline-block">
                                <button type="submit" className="text-red-500 hover:underline">
                                    Logout
                                </button>
                            </form>

                        </div>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
