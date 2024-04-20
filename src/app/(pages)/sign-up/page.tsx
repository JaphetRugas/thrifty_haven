import SignUpForm from "@/components/SignUpForm";
import { validateRequest } from "@/database/auth";
import { notFound, redirect } from "next/navigation";

export default async function SignUpPage() {
  const { user } = await validateRequest();
  if (user && !user.isAdmin) {
    redirect("/")
  }
  if (user?.isAdmin) {
    notFound();
  }

  return (
    <div>
      <SignUpForm />
    </div>
  );
}
