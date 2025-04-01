  "use client";

  import { useState, useEffect } from "react";
  import { ProductCard } from "@/components/store/ProductCard";
  import type { PaystackProduct } from "@/types/store";
  import { GlobalHero } from "@/components/global-hero";
  import { storeBg } from "@/constants/AppImages";
  import { toast } from "sonner";
  import { fetchPaystackProducts } from "@/utils/paystack";
  import { ProductCardSkeleton } from "@/components/store/ProductCardSkeleton";

  export default function StorePage() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<PaystackProduct[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const res = await fetchPaystackProducts();
          setProducts(res);
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

      fetchProducts();
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
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                : products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
