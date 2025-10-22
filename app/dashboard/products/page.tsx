"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const { data } = useProducts(search);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Products
      </h1>

      <div className="mb-6">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item Number</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Currency</th>
                    <th className="text-left py-2">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((p: any) => (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{p.item_number}</td>
                      <td className="py-2">{p.item_description}</td>
                      <td className="py-2">{p.currency}</td>
                      <td className="py-2">{p.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">
              {search ? "No products found" : "Search to view products"}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
