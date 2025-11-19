import { useState, useCallback, useEffect } from "react";
import { useGetPhotos } from "@/hooks/api/photo";
import type { Photo } from "@/api/entities/photo";

const PHOTOS_PER_PAGE = 30;

/**
 * Custom hook for infinite scroll photos
 * Manages pagination and photo accumulation
 */
export function useInfinitePhotos() {
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error, isFetching } = useGetPhotos(
    { page, limit: PHOTOS_PER_PAGE },
    {
      enabled: hasMore,
      queryKey: ["photos", page],
    }
  );

  // Update photos when new data arrives
  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setAllPhotos((prev) => [...prev, ...data]);

        if (data.length < PHOTOS_PER_PAGE) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isFetching]);

  return {
    photos: allPhotos,
    isLoading,
    isFetching,
    error,
    hasMore,
    loadMore,
  };
}
