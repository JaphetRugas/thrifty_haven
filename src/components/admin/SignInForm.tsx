"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { signInFormSchema } from "@/types";
import { signIn } from "@/app/actions/admin.auth.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      const res = await signIn(values);
      if (res.success) { 
        toast.success('Sign in successful'); 
      } else { 
        toast.error('Sign in failed. Please check your credentials and try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred:');
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-800">Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your password" {...field} type="password" className="w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-gray-400" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300">Submit</Button>
        </form>
      </Form>
      <ToastContainer />
    </div>
  );
}
