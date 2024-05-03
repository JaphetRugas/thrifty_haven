import Dashboard from '@/components/admin/Dashboard';
import { validateRequest } from '@/database/auth';
import { notFound, redirect } from 'next/navigation';

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
            <div>
                <h2>Sales Chart</h2>
                <Dashboard />
            </div>

        </div>
    )
}
