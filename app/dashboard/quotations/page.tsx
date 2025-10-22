"use client";

import Link from "next/link";
import { useQuotations } from "@/hooks/useQuotations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function QuotationsPage() {
  const { data } = useQuotations();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Quotations
        </h1>
        <Link href="/dashboard/quotations/new">
          <Button>New Quotation</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID</th>
                    <th className="text-left py-2">Client Email</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.data.map((q: any) => (
                    <tr key={q.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 truncate">{q.id.slice(0, 8)}...</td>
                      <td className="py-2">{q.client_email}</td>
                      <td className="py-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                          {q.status}
                        </span>
                      </td>
                      <td className="py-2">
                        {q.currency} {q.total || 0}
                      </td>
                      <td className="py-2">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2">
                        <Link href={`/dashboard/quotations/${q.id}`}>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No quotations found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
