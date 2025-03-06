import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Book } from "@/types/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface BookPreviewModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookPreviewModal({
  book,
  isOpen,
  onClose,
}: BookPreviewModalProps) {
  const { addItem } = useCart();

  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative h-[400px]">
            <Image
              src={book.coverArt || "/placeholder.svg"}
              alt={book.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg mb-4">{book.description}</p>
            <div className="space-y-2 mb-6">
              <p>
                <span className="font-semibold">Author:</span> {book.author}
              </p>
              <p>
                <span className="font-semibold">Pages:</span> {book.pages}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book.isbn}
              </p>
              <p className="text-2xl font-bold">${book.price.toFixed(2)}</p>
            </div>
            <Button
              onClick={() => {
                addItem(book);
                onClose();
              }}
              className="mt-auto"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
