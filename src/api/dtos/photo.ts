import { z } from "zod";
import { PhotoSchema } from "../entities/photo";

/**
 * Response for fetching list of photos
 * Lorem Picsum API returns array directly
 */
export const GetPhotosResponseSchema = z.array(PhotoSchema);

export type GetPhotosResponse = z.infer<typeof GetPhotosResponseSchema>;

/**
 * Query parameters for fetching photos
 */
export const GetPhotosParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
});

export type GetPhotosParams = z.infer<typeof GetPhotosParamsSchema>;

/**
 * Response for fetching a single photo
 * Lorem Picsum API returns photo info
 */
export const GetPhotoResponseSchema = PhotoSchema;

export type GetPhotoResponse = z.infer<typeof GetPhotoResponseSchema>;
