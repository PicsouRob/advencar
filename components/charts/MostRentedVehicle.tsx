"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MostVehicleRentedProps } from "@/types/chart";
import { formatDate } from "@/utils/date";

const chartConfig = {
    total: {
        label: "Total Alquilado",
        color: "hsl(var(--chart-1))",
    },
    moneyGenerated: {
        label: "Dinero Generado",
        color: "#f4a261",
    },
} satisfies ChartConfig;

type MostRentedVehicleProps = {
    chartData: MostVehicleRentedProps[];
}

export function MostRentedVehicle({ chartData }: MostRentedVehicleProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Más alquilados</CardTitle>

                <CardDescription>{formatDate().toUpperCase()}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="vehicle"
                            // tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.split(" ")[0]}
                            domain={["dataMin", "dataMax + 100"]}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />

                        <ChartLegend content={<ChartLegendContent />} />

                        <Bar dataKey="total" fill="var(--color-total)" radius={4}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>

                        <Bar dataKey="moneyGenerated" fill="var(--color-moneyGenerated)" radius={4}>
                            <LabelList
                                position="middle"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                                angle={90}
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
                    Muestra los los tipos de vehículos más alquilados.
                </div>
            </CardFooter>
        </Card>
    );
}
