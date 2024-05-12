import Link from "next/link";
import { validateRequest } from '@/database/auth';
import { notFound, redirect } from 'next/navigation';
import AdminNavigation from "@/components/admin/Navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/admin/sign-in");
  }
  if (!user?.isAdmin) {
    notFound();
  }
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen w-full flex-col">
          <AdminNavigation>
            {children}
          </AdminNavigation>
        </div>
      </body>
    </html>
  );
}
