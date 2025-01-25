"use client";

import {
    Bar, BarChart, CartesianGrid,
    LabelList, XAxis
} from "recharts";
import { TrendingUp } from "lucide-react";

import {
    ChartConfig, ChartContainer,
    ChartTooltip, ChartTooltipContent
} from "@/components/ui/chart";
import {
    Card, CardContent, CardDescription,
    CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";

const chartData = [
    { month: "Enero", rent: 100 },
    { month: "Febrero", rent: 200 },
    { month: "Marzo", rent: 112 },
    { month: "Abril", rent: 98 },
    { month: "Mayo", rent: 67 },
    { month: "Junio", rent: 104 },
    { month: "Julio", rent: 78 },
    { month: "Agosto", rent: 90 },
    { month: "Septiembre", rent: 54 },
    { month: "Octubre", rent: 76 },
    { month: "Noviembre", rent: 93 },
    { month: "Diciembre", rent: 120 },
];

const chartConfig = {
    rent: {
        label: "Alquiler",
        color: "#0b3948", 
    }
} satisfies ChartConfig;

export function RentChartBar() {
    const date = new Date(); 
    const formattedDate = date.toLocaleDateString("es-ES", {
        weekday: "short",
        year: "numeric",
        month: "short", 
        day: "numeric",
    });
    
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Renta por mes</CardTitle>
                <CardDescription className="uppercase">{ formattedDate }</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full max-h-[300px]">
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Bar dataKey="rent" fill="var(--color-rent)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Tendencia al alza del 5,2% este mes <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Muestra el total de alquileres realizados cada mes.
                </div>
            </CardFooter>
        </Card>
    );
}
