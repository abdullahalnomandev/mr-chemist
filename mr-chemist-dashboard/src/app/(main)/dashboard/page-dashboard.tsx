"use client";

import { DashboardStats } from "@/components/dashboard/dashboard-stats";
// import { LowStockAlert } from "@/components/dashboard/low-stock-alert";
// import { Overview } from "@/components/dashboard/overview";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serverApiRequest } from "@/lib/utils-server";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["DASHBOARD_DATA"],
    queryFn: () => serverApiRequest("get", "/admins/dashboard"),
    select: ({ data }) => ({
      data: data,
    }),
  });

  console.log("data", data);

  if (!data && !isLoading) return <div>Loading...</div>;

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {/* <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger> */}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <DashboardStats data={data?.data} />
          <div className="grid gap-4">
            {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7"> */}
            {/* <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  View your sales and revenue over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card> */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest orders from your customers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrders orders={data?.data.latestOrders}/>
              </CardContent>
            </Card>
          </div>
          {/* <LowStockAlert /> */}
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Detailed analytics and insights about your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Generate and view reports for your business
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reports content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
