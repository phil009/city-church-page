import { Skeleton } from "@/components/ui/skeleton"

export function ProductCardSkeleton() {
  return (
    <div className="group relative bg-white aspect-[10/14] rounded-lg border-b-2 border-gray-200 shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-[45%] w-full">
        <Skeleton className="h-full w-full" />

        {/* Icon skeleton */}
        <div className="absolute top-2 right-2">
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-2 h-[55%] flex flex-col justify-between sm:p-4">
        <div>
          {/* Title skeleton */}
          <Skeleton className="h-4 sm:h-6 w-3/4 mb-2" />

          {/* Description skeleton - hidden on mobile */}
          <div className="hidden sm:block">
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* Price skeleton */}
        <div className="flex flex-col w-full">
          <Skeleton className="h-4 sm:h-5 w-1/3" />
        </div>
      </div>
    </div>
  )
}

