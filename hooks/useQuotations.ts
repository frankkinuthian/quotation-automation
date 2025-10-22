import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Quotation } from "@/lib/types";
import {
  createQuotationSchema,
  type CreateQuotationInput,
} from "@/lib/validators";

export const useQuotations = (page = 1, limit = 10, status?: string) => {
  return useQuery({
    queryKey: ["quotations", page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
      });
      const res = await fetch(`/api/quotations?${params}`);
      if (!res.ok) throw new Error("Failed to fetch quotations");
      return res.json();
    },
  });
};

export const useCreateQuotation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuotationInput) => {
      const validated = createQuotationSchema.parse(data);
      const res = await fetch("/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to create quotation");
      return res.json() as Promise<Quotation>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotations"] });
    },
  });
};
