import SignInForm from "@/components/SignInForm";
import { validateRequest } from "@/database/auth";
import { notFound, redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateRequest();
  if (user && !user.isAdmin) {
    redirect("/")
  }
  if (user?.isAdmin) {
    notFound();
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
