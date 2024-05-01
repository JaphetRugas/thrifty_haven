import { validateRequest } from '@/database/auth';
import { notFound, redirect } from 'next/navigation';
import { signOut } from "@/app/actions/auth.actions";
import ProductForm from '@/components/admin/ProductForm';

export default async function AdminPage() {
    const { user } = await validateRequest();
    if (!user) {
        redirect("/admin/sign-in");
    }
    if (!user?.isAdmin) {
        notFound();
    }

    return (
        <div>
            Admin Page
            <p>{JSON.stringify(user.isAdmin)}</p>

            <ProductForm />

            <form action={signOut}>
                <button type="submit" className="text-red-500 hover:underline">
                    Logout
                </button>
            </form>
        </div>
    )
}
