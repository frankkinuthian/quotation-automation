"use client";

import React from "react";
import { useQuotations } from "@/hooks/useQuotations";
import { useEmails } from "@/hooks/useEmails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: quotationsData } = useQuotations();
  const { data: emailsData } = useEmails();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{quotationsData?.total || 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unprocessed Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {emailsData?.data?.filter((e: any) => e.status === "received")
                .length || 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Quotations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {quotationsData?.data?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quotations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          {quotationsData?.data?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Client Email</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {quotationsData.data.slice(0, 5).map((q: any) => (
                    <tr key={q.id} className="border-b">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No quotations yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
