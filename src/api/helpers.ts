import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { client } from "./axios";
import { z } from "zod";
import { AxiosError } from "axios";

/**
 * Helper function to create a GET query hook
 */
export function createGetQueryHook<TResponse>({
  endpoint,
  responseSchema,
  rQueryParams = {},
}: {
  endpoint: string | ((params?: Record<string, unknown>) => string);
  responseSchema: z.ZodType<TResponse>;
  rQueryParams?: Partial<UseQueryOptions<TResponse, AxiosError>>;
}) {
  return function useGetQuery(
    params?: Record<string, unknown>,
    options?: Partial<UseQueryOptions<TResponse, AxiosError>>
  ) {
    const url = typeof endpoint === "function" ? endpoint(params) : endpoint;

    return useQuery<TResponse, AxiosError>({
      queryKey: rQueryParams.queryKey || [url, params],
      queryFn: async () => {
        const { data } = await client.get(url, { params });
        return responseSchema.parse(data);
      },
      ...rQueryParams,
      ...options,
    });
  };
}

/**
 * Helper function to create a POST mutation hook
 */
export function createPostMutationHook<TBody, TResponse>({
  endpoint,
  bodySchema,
  responseSchema,
  rMutationParams = {},
}: {
  endpoint: string | ((params?: Record<string, unknown>) => string);
  bodySchema?: z.ZodType<TBody>;
  responseSchema: z.ZodType<TResponse>;
  rMutationParams?: Partial<
    UseMutationOptions<TResponse, AxiosError, { variables: TBody }>
  >;
}) {
  return function usePostMutation(
    options?: Partial<
      UseMutationOptions<TResponse, AxiosError, { variables: TBody }>
    >
  ) {
    return useMutation<TResponse, AxiosError, { variables: TBody }>({
      mutationFn: async ({ variables }) => {
        const validatedBody = bodySchema
          ? bodySchema.parse(variables)
          : variables;
        const url = typeof endpoint === "function" ? endpoint() : endpoint;
        const { data } = await client.post(url, validatedBody);
        return responseSchema.parse(data);
      },
      ...rMutationParams,
      ...options,
    });
  };
}

/**
 * Helper function to create a PUT mutation hook
 */
export function createPutMutationHook<TBody, TResponse>({
  endpoint,
  bodySchema,
  responseSchema,
  rMutationParams = {},
}: {
  endpoint: string | ((params?: Record<string, unknown>) => string);
  bodySchema?: z.ZodType<TBody>;
  responseSchema: z.ZodType<TResponse>;
  rMutationParams?: Partial<
    UseMutationOptions<
      TResponse,
      AxiosError,
      { variables: TBody; params?: Record<string, unknown> }
    >
  >;
}) {
  return function usePutMutation(
    options?: Partial<
      UseMutationOptions<
        TResponse,
        AxiosError,
        { variables: TBody; params?: Record<string, unknown> }
      >
    >
  ) {
    return useMutation<
      TResponse,
      AxiosError,
      { variables: TBody; params?: Record<string, unknown> }
    >({
      mutationFn: async ({ variables, params }) => {
        const validatedBody = bodySchema
          ? bodySchema.parse(variables)
          : variables;
        const url =
          typeof endpoint === "function" ? endpoint(params) : endpoint;
        const { data } = await client.put(url, validatedBody);
        return responseSchema.parse(data);
      },
      ...rMutationParams,
      ...options,
    });
  };
}

/**
 * Helper function to create a PATCH mutation hook
 */
export function createPatchMutationHook<TBody, TResponse>({
  endpoint,
  bodySchema,
  responseSchema,
  rMutationParams = {},
}: {
  endpoint: string | ((params?: Record<string, unknown>) => string);
  bodySchema?: z.ZodType<TBody>;
  responseSchema: z.ZodType<TResponse>;
  rMutationParams?: Partial<
    UseMutationOptions<
      TResponse,
      AxiosError,
      { variables: TBody; params?: Record<string, unknown> }
    >
  >;
}) {
  return function usePatchMutation(
    options?: Partial<
      UseMutationOptions<
        TResponse,
        AxiosError,
        { variables: TBody; params?: Record<string, unknown> }
      >
    >
  ) {
    return useMutation<
      TResponse,
      AxiosError,
      { variables: TBody; params?: Record<string, unknown> }
    >({
      mutationFn: async ({ variables, params }) => {
        const validatedBody = bodySchema
          ? bodySchema.parse(variables)
          : variables;
        const url =
          typeof endpoint === "function" ? endpoint(params) : endpoint;
        const { data } = await client.patch(url, validatedBody);
        return responseSchema.parse(data);
      },
      ...rMutationParams,
      ...options,
    });
  };
}

/**
 * Helper function to create a DELETE mutation hook
 */
export function createDeleteMutationHook<TResponse>({
  endpoint,
  responseSchema,
  rMutationParams = {},
}: {
  endpoint: string | ((params?: Record<string, unknown>) => string);
  responseSchema: z.ZodType<TResponse>;
  rMutationParams?: Partial<
    UseMutationOptions<
      TResponse,
      AxiosError,
      { params?: Record<string, unknown> }
    >
  >;
}) {
  return function useDeleteMutation(
    options?: Partial<
      UseMutationOptions<
        TResponse,
        AxiosError,
        { params?: Record<string, unknown> }
      >
    >
  ) {
    return useMutation<
      TResponse,
      AxiosError,
      { params?: Record<string, unknown> }
    >({
      mutationFn: async ({ params }) => {
        const url =
          typeof endpoint === "function" ? endpoint(params) : endpoint;
        const { data } = await client.delete(url);
        return responseSchema.parse(data);
      },
      ...rMutationParams,
      ...options,
    });
  };
}
