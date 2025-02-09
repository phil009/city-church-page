import type { CartItem as TCartItem } from "@/types/store"
import { useCart } from "@/hooks/useCart"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CartItemProps {
  item: TCartItem
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20">
        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.title}
          fill
          className="object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.product.title}</h3>
          <Button variant="ghost" size="icon" onClick={() => removeItem(item.product.id)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button variant="outline" size="icon" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

