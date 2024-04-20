import SignInForm from "@/components/SignInForm";
import { validateRequest } from "@/database/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const { user } = await validateRequest(); 
  if (user) {
    redirect("/");
  }

  return (
    <div>
      <SignInForm />
    </div>
  );
}
