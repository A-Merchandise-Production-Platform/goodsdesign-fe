"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface FactoryPerformanceProps {
  data: Array<{
    factoryId: string
    orderCount: number
    totalRevenue: number
  }>
}

export function FactoryPerformanceChart({ data }: FactoryPerformanceProps) {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: `Factory ${item.factoryId.substring(0, 4)}`,
    orders: item.orderCount,
    revenue: item.totalRevenue / 1000, // Convert to thousands for better display
  }))

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip
          formatter={(value, name) => {
            if (name === "revenue") {
              return [`$${value}k`, "Revenue"]
            }
            return [value, "Orders"]
          }}
        />
        <Bar yAxisId="left" dataKey="orders" fill="var(--chart-1)" name="Orders" />
        <Bar yAxisId="right" dataKey="revenue" fill="var(--chart-2)" name="Revenue ($k)" />
      </BarChart>
    </ResponsiveContainer>
  )
}

