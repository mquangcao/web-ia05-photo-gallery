import { z } from "zod";

/**
 * Base response schema wrapper
 * For APIs that return data in a specific structure
 */
export function BaseResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    data: dataSchema,
    success: z.boolean().optional(),
    message: z.string().optional(),
  });
}

/**
 * For APIs that directly return the data without wrapping
 */
export function DirectResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return dataSchema;
}
