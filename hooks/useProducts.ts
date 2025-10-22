import { useQuery } from "@tanstack/react-query";

export const useProducts = (query = "", currency?: string, page = 1) => {
  return useQuery({
    queryKey: ["products", query, currency, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        ...(currency && { currency }),
      });
      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    enabled: query.length > 0,
  });
};
