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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { productFormSchema } from "@/types";

// Custom file input component 
const FileInput: React.FC<{ onChange: React.ChangeEventHandler<HTMLInputElement> }> = ({ onChange }) => (
    <input type="file" onChange={onChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
);

export default function ProductForm() {
    const router = useRouter();

    // 1. Define your form.
    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: {
            name: "",
            description: "",
            price: undefined,
            quantityAvailable: undefined,
            image: undefined,
        },
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        const formData = new FormData();
        const fileImage = values.image;
        if (!fileImage) {
            throw new Error("Image File is null.");
        }

        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("quantityAvailable", values.quantityAvailable);
        formData.append("image", fileImage);

        const response = await fetch('/api/admin/products', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            toast.success('Product uploaded successfully');
            setTimeout(() => {
                router.push('/admin/products');
            }, 3000);
        } else {
            toast.error('Failed to upload product');
        }
    }

    // Function to handle file change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        if (file) {
            form.setValue("image", file);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Price</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter product price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="quantityAvailable"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Quantity Available</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter quantity available" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Image</FormLabel>
                                    <FormControl>
                                        <label htmlFor="fileInput" className="flex items-center justify-center w-full h-10 border border-gray-300 rounded-md cursor-pointer">
                                            <FileInput onChange={handleFileChange} />
                                        </label>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            <ToastContainer />
        </>
    );
}
