import { useEffect, useRef } from "react";
import { useInfinitePhotos } from "@/hooks/use-infinite-photos";
import { PhotoCard } from "./photo-card";
import { PhotoCardSkeleton } from "./photo-card-skeleton";

/**
 * Photo List Component with infinite scroll
 * Contains all logic for fetching and displaying photos
 */
export function PhotoList() {
  const observerTarget = useRef<HTMLDivElement>(null);
  const { photos, isLoading, isFetching, error, hasMore, loadMore } =
    useInfinitePhotos();

  // Infinite scroll using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore]);

  // Error state
  if (error && photos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg">Error loading photos</p>
        <p className="text-gray-600 mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}

        {/* Loading skeletons */}
        {(isLoading || isFetching) &&
          Array.from({ length: 8 }).map((_, index) => (
            <PhotoCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {/* Intersection observer target */}
      <div ref={observerTarget} className="h-10 mt-8" />

      {/* End of list message */}
      {!hasMore && photos.length > 0 && (
        <p className="text-center text-gray-600 mt-8 mb-12">
          No more photos to load
        </p>
      )}

      {/* Loading indicator */}
      {isFetching && hasMore && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
