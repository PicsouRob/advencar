import { VehiclesChart } from "@/components/charts/VehiclesChart";
import { ChartGenerator } from "@/libs/chartGenerator";
import WidgetStatistics from "./WidgetStatistics";
import { StatisticsData } from "@/libs/statisticsData";
import { Rent } from "@prisma/client";
import { prisma } from "@/libs/prisma.config";
import { TotalRentByVehicleType } from "@/components/charts/TotalRentByVehicleType";
import { MostVehicleTypeRentedProps } from "@/types/chart";

type ChartDataProps = {
    status: string;
    data: number;
}

const fetchData = async () => {
    const chartGenerator: ChartGenerator = new ChartGenerator();
    const statuses: string[] = ["Disponible", "Alquilado", "En reparación"];

    const chartData: ChartDataProps[] = await Promise.all(
        statuses.map(async (status) => {
            return {
                status,
                data: (await chartGenerator.getVehiculesByStatus(status)).length
            };
        })
    );

    return chartData;
}

const Dashboard: React.FC = async () => {
    const rents: Rent[] = await prisma.rent.findMany();

    const chartData: ChartDataProps[] = await fetchData();
    const chartGenerator: ChartGenerator = new ChartGenerator();
    const statisticsData: StatisticsData = new StatisticsData(rents);

    const totalRentsForTheDay: number = await statisticsData.getTotalRentsForDay();
    const totalRentsForTheWeek: number = await statisticsData.getTotalRentsForWeek();
    const totalRentsForTheMonth: number = await statisticsData.getTotalRentsForMonth();
    const totalRentsForTheYear: number = await statisticsData.getTotalRentsForYear();

    const totalRentsForLastDay: number = await statisticsData.getTotalRentsForDay(new Date().getDate() - 1);
    const totalRentsForLastWeek: number = await statisticsData.getTotalRentsForWeek(new Date().getDay() - 1);
    const totalRentsForLastMonth: number = await statisticsData.getTotalRentsForMonth(new Date().getMonth() - 1);
    const totalRentsForLastYear: number = await statisticsData.getTotalRentsForYear(new Date().getFullYear() - 1);

    const mostRentedVehiclesType: MostVehicleTypeRentedProps[] = await chartGenerator.getMostVehicleTypeRented();

    return (
        <div className="space-y-4">
            <h1 className="font-bold">Estadísticos de alquileres</h1>

            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <WidgetStatistics
                    compareTo="ayer"
                    total={totalRentsForTheDay}
                    widgetFor="Para hoy"
                    lastData={totalRentsForLastDay}
                />

                <WidgetStatistics
                    compareTo="la semana pasada"
                    total={totalRentsForTheWeek}
                    widgetFor="Esta semana"
                    lastData={totalRentsForLastWeek}
                />

                <WidgetStatistics
                    compareTo="el mes pasado"
                    total={totalRentsForTheMonth}
                    widgetFor="Este mes"
                    lastData={totalRentsForLastMonth}
                />

                <WidgetStatistics
                    compareTo="el año pasado"
                    total={totalRentsForTheYear}
                    widgetFor="Este año"
                    lastData={totalRentsForLastYear}
                />
            </div>

            <h1 className="font-bold">Estadísticos de alquileres</h1>

            <div className="">
                
            </div>

            <div className="grid xl:grid-cols-2 gap-4">
                <VehiclesChart chartData={chartData} />

                <TotalRentByVehicleType chartData={mostRentedVehiclesType} />
            </div>

            <div className="">

            </div>

            <div className="grid xl:grid-cols-2 gap-4">
            </div>
        </div>
    );
}

export default Dashboard;
