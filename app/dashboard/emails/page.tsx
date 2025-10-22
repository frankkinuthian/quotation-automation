"use client";

import { useEmails } from "@/hooks/useEmails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmailsPage() {
  const { data } = useEmails();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Email Monitor
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Recent Emails</CardTitle>
        </CardHeader>
        <CardContent>
          {data?.data?.length ? (
            <div className="space-y-4">
              {data.data.map((e: any) => (
                <div key={e.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{e.subject}</p>
                      <p className="text-sm text-gray-500">{e.from_email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-sm font-medium
                      ${
                        e.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : e.status === "failed"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {e.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {new Date(e.created_at).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No emails found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
