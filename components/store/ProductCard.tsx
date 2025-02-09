import type { Book, AudioMessage } from "@/types/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Music, BookIcon } from "lucide-react";

interface ProductCardProps {
  product: Book | AudioMessage;
  onPreview: () => void;
}

export function ProductCard({ product, onPreview }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg border-b-2 border-appRed shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-[300px]">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          {product.category === "audio" ? (
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <Music className="h-4 w-4" />
            </div>
          ) : (
            <div className="bg-green-500 text-white p-2 rounded-full">
              <BookIcon className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
        <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <Button onClick={onPreview}>Preview</Button>
        </div>
      </div>
    </div>
  );
}
