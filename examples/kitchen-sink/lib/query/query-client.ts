import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5_000,
      gcTime: 5 * 60 * 1_000,
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});
