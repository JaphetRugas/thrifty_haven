'use client'

import React, { FormEvent, useEffect, useState } from 'react';
import Image from "next/image"
import {
    ChevronLeft,
    Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantityAvailable: number;
    image: string;
    isActive: boolean;
}

interface Params {
    productId: string;
}

export default function ProductPage({ params }: { params: Params }) {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        fetch(`/api/admin/products/${params.productId}`)
            .then(response => response.json())
            .then(data => {
                if (data.product) {
                    setProduct(data.product);
                    setIsActive(data.product.isActive);
                }
            })
            .catch(error => console.error('Error fetching product details:', error))
            .finally(() => setLoading(false));
    }, [params.productId]);

    // Function to handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) { throw new Error("No files selected"); }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setUploadedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget); 
        formData.append('isActive', String(isActive)); 

        const response = await fetch(`/api/admin/products/${params.productId}`, {
            method: 'PUT',
            body: formData,
        });
        // Handle response if necessary
        const data = await response.json(); 

        if (response.ok) {
            toast.success(data.message);
            setTimeout(() => { 
                router.push(`/admin/products`)
            }, 3000);
        } else {
            toast.error(data.message);
        }
    };


    if (loading) {
        return (
            <div className="h-screen bg-white">
                <div className="flex justify-center items-center h-full">
                    <Image className="h-16 w-16" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" width={100} height={100} alt="" />
                </div>
            </div>
        )
    }

    if (!product) {
        return <p>Product not found</p>;
    }
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="gap-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-4 mb-5">
                        <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.push('/admin/products')}>
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {product.name}
                        </h1>
                        <Badge variant="outline" className="ml-auto sm:ml-0">
                            {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button variant="outline" size="sm" onClick={() => router.push('/admin/products')}>
                                Discard
                            </Button>
                            <Button size="sm" type='submit'>Save Product</Button>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                            <Card
                                className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
                            >
                                <CardHeader>
                                    <CardTitle>Product Images</CardTitle>
                                    <CardDescription>
                                        View and manage images for your product. You can upload new images or remove existing ones.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-2">
                                        <Image
                                            alt="Product image"
                                            className="aspect-square w-full rounded-md object-cover"
                                            src={uploadedImage || product.image}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                            }}
                                            width={500}
                                            height={300}
                                        />
                                        <div className="grid grid-cols-3 gap-2">
                                            <label htmlFor="upload" className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                                <span className="sr-only">Upload</span>
                                                <input name="image" type="file" id="upload" className="hidden" onChange={handleImageUpload} />
                                            </label>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <Card x-chunk="dashboard-07-chunk-0">
                                <CardHeader>
                                    <CardTitle>Product Details</CardTitle>
                                    <CardDescription>
                                        Edit details of your product such as name, description, and other attributes.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                name='name'
                                                id="name"
                                                type="text"
                                                className="w-full"
                                                defaultValue={product.name}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                name='description'
                                                id="description"
                                                defaultValue={product.description}
                                                className="min-h-32"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Stocks</Label>
                                            <Input
                                                name='quantityAvailable'
                                                id="name"
                                                type="number"
                                                className="w-full"
                                                defaultValue={product.quantityAvailable}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Price(₱)</Label>
                                            <Input
                                                name='price'
                                                id="name"
                                                type="number"
                                                className="w-full"
                                                defaultValue={product.price}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card x-chunk="dashboard-07-chunk-3">
                                <CardHeader>
                                    <CardTitle>Product Status</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="status">Status</Label>
                                            <Select onValueChange={(value) => setIsActive(value === 'active')}>
                                                <SelectTrigger id="status" aria-label="Select status">
                                                    <SelectValue placeholder={product.isActive ? 'Active' : 'Archived'} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem
                                                        value="active"
                                                        onClick={() => setIsActive(true)}
                                                    >
                                                        Active
                                                    </SelectItem>
                                                    <SelectItem
                                                        value="archived"
                                                        onClick={() => setIsActive(false)}
                                                    >
                                                        Archived
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>

                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </main>
    )
}
