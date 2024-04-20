import { validateRequest } from "@/database/auth"; 
import { notFound, redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    redirect("/sign-in");
  }
  if (user?.isAdmin) {
    notFound();
  }
  return (
    <>
      <p>Client</p>
      <p>{JSON.stringify(user.email)}</p>
      <p>{JSON.stringify(user.isAdmin)}</p>

      <form action={signOut}>
        <button type="submit" className="text-red-500 hover:underline">
          Logout
        </button>
      </form>


    </>
  );
}
