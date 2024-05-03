import SignInForm from "@/components/admin/SignInForm";
import { validateRequest } from "@/database/auth";
import { notFound, redirect } from "next/navigation";

export default async function SignInPage() {
    const { user } = await validateRequest();
    if (user && user.isAdmin) {
        redirect("/admin")
    }
    if (user && !user.isAdmin) {
        notFound();
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SignInForm />
        </div>
    );
}
