import SignUpForm from "@/components/SignUpForm";
import { validateRequest } from "@/database/auth"; 
import { redirect } from "next/navigation";

export default async function SignUpPage() { 
  const { user } = await validateRequest(); 
  if (user) {
    redirect("/");
  }

  return (
    <div> 
        <SignUpForm /> 
    </div>
  );
}
