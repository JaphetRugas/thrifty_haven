import { validateRequest } from "@/database/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth.actions";

export default async function Home() {

  const { user } = await validateRequest();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <p>Private</p>
      <form action={signOut}>
        <button type="submit" className="text-red-500 hover:underline">
          Logout
        </button>
      </form>


    </>
  );
}
