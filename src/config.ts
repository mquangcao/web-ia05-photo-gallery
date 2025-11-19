export const app = {
  name: "Photo Gallery",
  photoStore: import.meta.env.VITE_PHOTO_STORE_URL || "/api",
};
