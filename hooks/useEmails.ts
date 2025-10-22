import { useQuery } from "@tanstack/react-query";

export const useEmails = (limit = 20) => {
  return useQuery({
    queryKey: ["emails", limit],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: limit.toString() });
      const res = await fetch(`/api/emails?${params}`);
      if (!res.ok) throw new Error("Failed to fetch emails");
      return res.json();
    },
  });
};
