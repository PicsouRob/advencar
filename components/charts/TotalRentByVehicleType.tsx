"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MostVehicleTypeRentedProps } from "@/types/chart";
import { formatDate } from "@/utils/date";

// const chartData = [
//   { vehicleType: "sedan", data: 275, fill: "var(--color-sedan)" },
//   { vehicleType: "suv", data: 200, fill: "var(--color-suv)" },
//   { vehicleType: "pickup", data: 187, fill: "var(--color-pickup)" },
//   { vehicleType: "deportivo", data: 173, fill: "var(--color-deportivo)" },
//   { vehicleType: "hatchback", data: 90, fill: "var(--color-hatchback)" },
// ];

const chartConfig = {
  data: {
    label: "Cantidades",
  },
  sedán: {
    label: "Sedán",
    color: "hsl(var(--chart-1))",
  },
  suv: {
    label: "SUV",
    color: "hsl(var(--chart-2))",
  },
  pickup: {
    label: "Pickup",
    color: "hsl(var(--chart-3))",
  },
  deportivo: {
    label: "Deportivo",
    color: "hsl(var(--chart-4))",
  },
  hatchback: {
    label: "Hatchback",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function TotalRentByVehicleType({
  chartData
}: { chartData: MostVehicleTypeRentedProps[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total alquilados por tipo de vehiculo</CardTitle>
        <CardDescription>{ formatDate() }</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 15,
            }}
          >
            <YAxis
              dataKey="vehicleType"
              type="category"
              // tickLine={false}
              tickMargin={10}
              // axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />

            <CartesianGrid vertical={false} />

            <XAxis dataKey="total" type="number" className="fill-foreground" />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="total" layout="vertical" radius={5}>
              <LabelList
                dataKey="moneyGenerated"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label] text-white"
                fontSize={12}
              />

              <LabelList
                dataKey="total"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Muestra los los tipos de vehículos más alquilados hasta hoy.
        </div>
      </CardFooter>
    </Card>
  );
}
