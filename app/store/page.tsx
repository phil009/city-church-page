"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/store/ProductCard";
import type { PaystackProduct } from "@/types/store";
import { GlobalHero } from "@/components/global-hero";
import { storeBg } from "@/constants/AppImages";
import { toast } from "sonner";
import { fetchPaystackProducts } from "@/utils/paystack";
import { ProductCardSkeleton } from "@/components/store/ProductCardSkeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function StorePage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<PaystackProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<PaystackProduct[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchPaystackProducts();
        setProducts(res);
        setFilteredProducts(res);
        console.log("Products fetched:", res);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          "An error occurred while fetching products. Please try again later."
        );
        toast(
          "An error occurred while fetching products. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        const filtered = products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.description &&
              product.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when searching
      } else {
        setFilteredProducts(products);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
              Church Store
            </h1>

            {/* Search Input */}
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : currentItems.length > 0 ? (
              currentItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No products found matching your search.
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {!loading && filteredProducts.length > 0 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 h-9"
              >
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => paginate(i + 1)}
                    className="w-9 h-9 p-0"
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 h-9"
              >
                Next
              </Button>
            </div>
          )}

          {/* Products count */}
          {!loading && (
            <div className="text-center mt-4 text-sm text-gray-500">
              Showing {currentItems.length} of {filteredProducts.length}{" "}
              products
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
