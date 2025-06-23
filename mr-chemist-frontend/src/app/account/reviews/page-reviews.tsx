"use client";

import { Breadcrumb } from "@/components/account/breadcrumb";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getReviewableProducts } from "@/lib/api/reviews";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ReviewsPage() {
  const [filter, setFilter] = useState("last7days");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["reviewable-products"],
    queryFn: getReviewableProducts,
  });

  const breadcrumbItems = [{ label: "Reviews", href: "/account/reviews" }];

  // Define columns for the DataTable
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "product",
        header: "Product",
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={product.productImage || "/placeholder.svg"}
                  alt={product.productName}
                  width={64}
                  height={64}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="font-medium text-gray-900">{product.productName}</div>
                <div className="mt-1 text-sm text-gray-500">Weight: {product.weight}</div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span className="mr-1 inline-block h-3 w-3 rounded-full bg-gray-200"></span>
                  {product.category}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <div className="text-sm text-gray-500">${row.original.price.toFixed(2)}</div>,
      },
      {
        accessorKey: "action",
        header: "",
        cell: () => (
          <div className="text-right">
            <Button variant="outline" className="rounded-full">
              Write a review
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-800">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white p-4 shadow-xs">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-medium">My reviews</h1>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Last 7 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 days</SelectItem>
              <SelectItem value="last30days">Last 30 days</SelectItem>
              <SelectItem value="last3months">Last 3 months</SelectItem>
              <SelectItem value="last6months">Last 6 months</SelectItem>
              <SelectItem value="lastyear">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DataTable
          columns={columns}
          data={products || []}
          showRowSelection={false}
          showSearch={false}
          showToolbar={false}
          pageSize={5}
        />
      </div>
    </>
  );
}
