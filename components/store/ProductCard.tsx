import Image from "next/image";
import { Music, Package } from "lucide-react";
import Link from "next/link";
import { PaystackProduct } from "@/types/store";

interface ProductCardProps {
  product: PaystackProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const isDigital = product.type === "digital";

  return (
    <Link href={`https://paystack.com/buy/${product.slug}`} target="_blank">
      <div className="group relative bg-white aspect-[10/14] rounded-lg border-b-2 border-appRed shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-[45%] aspect-square w-full">
          <Image
            src={product?.files[0]?.path || "/images/events/sunday-service.jpg"}
            alt={product?.name}
            fill
            sizes="100%"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            {isDigital ? (
              <div className="bg-blue-500 text-white p-2 rounded-full">
                <Music className="h-4 w-4" />
              </div>
            ) : (
              <div className="bg-green-500 text-white p-2 rounded-full">
                <Package className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
        <div className="p-2 h-[55%] flex flex-col justify-between sm:p-4">
          <div>
            <h3 className="text-xs sm:text-lg sm:mb-2 uppercase">
              {product.name}
            </h3>
            <p className="text-sm sm:block hidden text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm sm:text-base font-medium">
              ₦ {(product.price / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
