"use client";

import { useState } from "react";
import Image from "next/image";
import { Music, Package } from "lucide-react";
import Link from "next/link";
import { PaystackProduct } from "@/types/store";
import { MinisterFormDialog } from "./MinisterFormDialog";

const MINISTER_FORM_PRODUCTS = ["change agent", "catalysis"];

function requiresMinisterForm(name: string) {
    return MINISTER_FORM_PRODUCTS.some((p) =>
        name.toLowerCase().includes(p)
    );
}

function stripHtml(html: string) {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

interface ProductCardProps {
    product: PaystackProduct;
}

export function ProductCard({ product }: ProductCardProps) {
    const isDigital = product.type === "digital";
    const [dialogOpen, setDialogOpen] = useState(false);
    const paystackUrl = `https://paystack.com/buy/${product.slug}`;

    const needsForm = isDigital && requiresMinisterForm(product.name);

    if (isDigital) {
        return (
            <>
                <div
                    className="group relative bg-white aspect-[10/14] rounded-lg border-b-2 border-appRed shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => needsForm ? setDialogOpen(true) : window.open(paystackUrl, "_blank")}
                >
                    <div className="relative h-[45%] aspect-square w-full">
                        <Image
                            src={
                                product?.files[0]?.path ||
                                "/images/events/sunday-service.jpg"
                            }
                            alt={product?.name}
                            fill
                            sizes="100%"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                                <Music className="h-4 w-4" />
                            </div>
                        </div>
                    </div>
                    <div className="p-2 h-[55%] flex flex-col justify-between sm:p-4 overflow-hidden">
                        <div className="min-h-0 overflow-hidden">
                            <h3 className="text-xs sm:text-sm sm:mb-1 uppercase leading-tight">
                                {product.name}
                            </h3>
                            <p className="text-xs sm:block hidden text-gray-600 line-clamp-3 overflow-hidden">
                                {stripHtml(product.description || "")}
                            </p>
                        </div>
                        <div className="flex flex-col w-full shrink-0">
                            <span className="text-sm sm:text-base font-medium">
                                ₦ {(product.price / 100).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                {needsForm && (
                    <MinisterFormDialog
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        productName={product.name}
                        paystackUrl={paystackUrl}
                    />
                )}
            </>
        );
    }

    return (
        <Link
            href={paystackUrl}
            target="_blank"
        >
            <div className="group relative bg-white aspect-[10/14] rounded-lg border-b-2 border-appRed shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-[45%] aspect-square w-full">
                    <Image
                        src={
                            product?.files[0]?.path ||
                            "/images/events/sunday-service.jpg"
                        }
                        alt={product?.name}
                        fill
                        sizes="100%"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                        <div className="bg-green-500 text-white p-2 rounded-full">
                            <Package className="h-4 w-4" />
                        </div>
                    </div>
                </div>
                <div className="p-2 h-[55%] flex flex-col justify-between sm:p-4">
                    <div>
                        <h3 className="text-xs sm:text-sm sm:mb-1 uppercase">
                            {product.name}
                        </h3>
                        <p className="text-xs sm:block hidden text-gray-600 line-clamp-2 truncate-2 text-ellipsis">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex flex-col w-full my-2">
                        <span className="text-sm sm:text-base font-medium">
                            ₦ {(product.price / 100).toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
