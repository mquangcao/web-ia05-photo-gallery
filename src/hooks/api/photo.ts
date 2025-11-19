import { createGetQueryHook } from "@/api/helpers";
import {
  GetPhotosResponseSchema,
  GetPhotoResponseSchema,
} from "@/api/dtos/photo";

/**
 * Hook to fetch list of photos with pagination
 * @param params - Query parameters { page, limit }
 */
export const useGetPhotos = createGetQueryHook({
  endpoint: "/v2/list",
  responseSchema: GetPhotosResponseSchema,
  rQueryParams: {
    queryKey: ["photos"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
});

/**
 * Hook to fetch a single photo by ID
 * @param params - { id: string }
 */
export const useGetPhoto = createGetQueryHook({
  endpoint: (params?: Record<string, unknown>) =>
    `/id/${params?.id as string}/info`,
  responseSchema: GetPhotoResponseSchema,
  rQueryParams: {
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
});
