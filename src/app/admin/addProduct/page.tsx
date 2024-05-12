import ProductForm from '@/components/admin/ProductForm'
import React from 'react'

export default function AddProduct() {
    return (
        <div className="container mx-auto px-4 py-8">  
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <ProductForm />
            </div>
        </div>
    )
}
