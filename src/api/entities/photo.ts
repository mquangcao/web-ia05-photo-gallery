import { z } from "zod";

/**
 * Photo entity schema from Lorem Picsum API
 * Represents a single photo with author and metadata
 */
export const PhotoSchema = z.object({
  id: z.string(),
  author: z.string(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  download_url: z.string(),
});

export type Photo = z.infer<typeof PhotoSchema>;
