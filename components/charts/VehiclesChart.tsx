"use client"

import { TrendingUp } from "lucide-react";
import {
    CartesianGrid, LabelList, Line, LineChart, XAxis,
    YAxis
} from "recharts";

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
import { formatDate } from "@/utils/date";

const chartConfig = {
    data: {
        label: "Total",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

type ChartDataProps = {
    status: string;
    data: number;
}

export function VehiclesChart(
    { chartData }: { chartData: ChartDataProps[] })
{
    return (
        <Card>
            <CardHeader>
                <CardTitle>Estado de Vehículos</CardTitle>

                <CardDescription>{formatDate()}</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 0,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="status"
                            tickMargin={8}
                            tickFormatter={(value) => value}
                        />

                        <YAxis dataKey="data" type="number" />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />

                        <Line
                            dataKey="data"
                            type="natural"
                            stroke="var(--color-data)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-data)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    <TrendingUp className="h-4 w-4" />
                </div>
                
                <div className="leading-none text-muted-foreground">
                    Muestra la cantidad de los vehículos por estado.
                </div>
            </CardFooter>
        </Card>
    );
}
