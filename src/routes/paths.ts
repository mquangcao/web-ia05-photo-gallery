/**
 * Centralized route paths
 */
export const paths = {
  photos: {
    root: "/",
    detail: (id: string) => `/photos/${id}`,
  },
} as const;
