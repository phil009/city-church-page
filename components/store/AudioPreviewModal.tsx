"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AudioMessage } from "@/types/store";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

interface AudioPreviewModalProps {
  audioMessage: AudioMessage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AudioPreviewModal({
  audioMessage,
  isOpen,
  onClose,
}: AudioPreviewModalProps) {
  const { addItem } = useCart();

  if (!audioMessage) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-white">
        <DialogHeader>
          <DialogTitle>{audioMessage.title}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 justify-items-start gap-6">
          <div className="relative w-full">
            <Image
              src={audioMessage.coverArt || "/placeholder.svg"}
              alt={audioMessage.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-lg mb-4">{audioMessage.description}</p>
            <div className="space-y-2 mb-6">
              <p>
                <span className="font-semibold">Speaker:</span>{" "}
                {audioMessage.speaker}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {audioMessage.duration}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(audioMessage.date).toLocaleDateString()}
              </p>
              <p className="text-2xl font-bold">
                ${audioMessage.price.toFixed(2)}
              </p>
            </div>

            <Button
              onClick={() => {
                addItem(audioMessage);
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
