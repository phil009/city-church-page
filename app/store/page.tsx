"use client";

import { useState, useEffect } from "react";
import { books } from "@/data/store-data";
import { ProductCard } from "@/components/store/ProductCard";
import { BookPreviewModal } from "@/components/store/BookPreviewModal";
import { AudioPreviewModal } from "@/components/store/AudioPreviewModal";
import { Cart } from "@/components/store/Cart";
import type { Book, AudioMessage } from "@/types/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlobalHero } from "@/components/global-hero";
import { storeBg } from "@/constants/AppImages";
import { toast } from "sonner";
import axios from "../../utils/axiosInstance";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton component for loading states
const ProductSkeleton = () => (
  <div className="min-w-[300px] aspect-[3/4] p-2">
    <Skeleton className="w-full h-full rounded-lg" />
  </div>
);

export default function StorePage() {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<AudioMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [audioMessages, setAudioMessages] = useState<AudioMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/audio/");
        setAudioMessages(res.data);
        console.log(audioMessages);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          "An error occurred while fetching audio messages. Please try again later."
        );
        toast(
          "An error occurred while fetching audio messages. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAudioMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="before:block before:h-12">
      <GlobalHero
        backgroundImage={storeBg}
        title="Store"
        breadcrumbs={[
          { label: "City Church", href: "/" },
          { label: "Store", href: "/store" },
        ]}
      />
      <div className="min-h-screen bg-gray-50 px-4 md:px-20 py-12">
        <div className="">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
              Church Store
            </h1>
            <Cart />
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger
                className="text-xs sm:text-sm md:text-base"
                value="all"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger
                className="text-xs sm:text-sm md:text-base"
                value="books"
              >
                Books
              </TabsTrigger>
              <TabsTrigger
                className="text-xs sm:text-sm md:text-base"
                value="audio"
              >
                Audio Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {books.map((book, id) => (
                  <ProductCard
                    key={id}
                    product={book}
                    onPreview={() => setSelectedBook(book)}
                  />
                ))}
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))
                  : audioMessages.map((audio) => (
                      <ProductCard
                        key={audio.id}
                        product={audio}
                        onPreview={() => setSelectedAudio(audio)}
                      />
                    ))}
              </div>
            </TabsContent>

            <TabsContent value="books">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {books.map((book) => (
                  <ProductCard
                    key={book.id}
                    product={book}
                    onPreview={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="audio">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                {loading
                  ? Array.from({ length: 5 }).map((_, index) => (
                      <ProductSkeleton key={index} />
                    ))
                  : audioMessages.map((audio) => (
                      <ProductCard
                        key={audio.id}
                        product={audio}
                        onPreview={() => setSelectedAudio(audio)}
                      />
                    ))}
              </div>
            </TabsContent>
          </Tabs>

          <BookPreviewModal
            book={selectedBook}
            isOpen={!!selectedBook}
            onClose={() => setSelectedBook(null)}
          />

          <AudioPreviewModal
            audioMessage={selectedAudio}
            isOpen={!!selectedAudio}
            onClose={() => setSelectedAudio(null)}
          />
        </div>
      </div>
    </section>
  );
}
