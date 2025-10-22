import { z } from "zod";

export const createQuotationSchema = z.object({
  clientEmail: z.string().email("Invalid email address"),
  clientName: z.string().optional(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      quantity: z.number().positive("Quantity must be positive"),
      unitPrice: z.number().positive("Unit price must be positive"),
    }),
  ),
  currency: z.enum(["KES", "USD", "EUR", "GBP"]).default("KES"),
});

export const searchProductSchema = z.object({
  query: z.string().min(1, "Search query required"),
  limit: z.number().positive().default(10),
  currency: z.enum(["KES", "USD", "EUR", "GBP"]).optional(),
});

export const updateQuotationSchema = z.object({
  clientEmail: z.string().email().optional(),
  clientName: z.string().optional(),
  status: z.enum(["draft", "sent", "accepted", "rejected"]).optional(),
  tax: z.number().nonnegative().optional(),
});

export type CreateQuotationInput = z.infer<typeof createQuotationSchema>;
export type SearchProductInput = z.infer<typeof searchProductSchema>;
export type UpdateQuotationInput = z.infer<typeof updateQuotationSchema>;
