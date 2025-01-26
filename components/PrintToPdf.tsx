"use client";

import { useEffect, useRef, useState } from "react";
import { useReactToPrint, UseReactToPrintFn } from "react-to-print";

import { Button } from "./ui/button";
import WidgetStatistics from "@/app/dashboard/WidgetStatistics";
import { getListData } from "@/utils/handleFetchAction";
import { StatisticsData } from "@/libs/statisticsData";
import RevenueByCarTable from "@/app/dashboard/reports/RevenueByCarTable";
import { Rent } from "@prisma/client";
import { formatDate } from "@/utils/date";

const PrintToPdf = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [rents, setRents] = useState<Rent[]>([]);
  
  const reactToPrintFn: UseReactToPrintFn = useReactToPrint({
    contentRef, documentTitle: `advencar_reportes_para_${
      formatDate(new Date().toDateString())}`, pageStyle: '12px 8px'
  });
  
  useEffect(() => {
    const fetchRents = async () => { 
      const listOfRents = await getListData<Rent>("/api/rent");
      
      setRents(listOfRents);
    }
    
    fetchRents();
  }, []);

  const statisticsData = new StatisticsData(rents);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-bold">Lista de los reportes</h1>
        
        <Button onClick={() => reactToPrintFn()}>Descarga reporte</Button>
      </div>

      <div ref={contentRef}
        className="space-y-4"
      >
        <h1 className="font-bold">Estadísticos de alquileres</h1>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <WidgetStatistics
            compareTo="ayer"
            total={statisticsData.getTotalRentsForDay()}
            widgetFor="Para hoy"
            lastData={statisticsData.getTotalRentsForDay(new Date().getDate() - 1)}
          />

          <WidgetStatistics
            compareTo="la semana pasada"
            total={statisticsData.getTotalRentsForWeek()}
            widgetFor="Esta semana"
            lastData={statisticsData.getTotalRentsForWeek(new Date().getDay() - 1)}
          />

          <WidgetStatistics
            compareTo="el mes pasado"
            total={statisticsData.getTotalRentsForMonth()}
            widgetFor="Este mes"
            lastData={statisticsData.getTotalRentsForMonth(new Date().getMonth() - 1)}
          />

          <WidgetStatistics
            compareTo="el año pasado"
            total={statisticsData.getTotalRentsForYear()}
            widgetFor="Este año"
            lastData={statisticsData.getTotalRentsForYear(new Date().getFullYear() - 1)}
          />
        </div>

        <h1 className="font-bold">Dinero entrado por los alquileres</h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <WidgetStatistics
            compareTo="ayer"
            total={statisticsData.getTotalIncomesForDay()}
            widgetFor="Para hoy"
            lastData={statisticsData.getTotalIncomesForDay(new Date().getDate() - 1)}
            moneyStatistics
          />

          <WidgetStatistics
            compareTo="la semana pasada"
            total={statisticsData.getTotalIncomesForWeek()}
            widgetFor="Esta semana"
            lastData={statisticsData.getTotalIncomesForWeek(new Date().getDay() - 1)}
            moneyStatistics
          />

          <WidgetStatistics
            compareTo="el mes pasado"
            total={statisticsData.getTotalIncomesForMonth()}
            widgetFor="Este mes"
            lastData={statisticsData.getTotalIncomesForMonth(new Date().getMonth() - 1)}
            moneyStatistics
          />

          <WidgetStatistics
            compareTo="el año pasado"
            total={statisticsData.getTotalIncomesForYear()}
            widgetFor="Este año"
            lastData={statisticsData.getTotalIncomesForYear(new Date().getFullYear() - 1)}
            moneyStatistics
          />
        </div>
        
        <RevenueByCarTable rents={rents} />
      </div>
    </div>
  );
}

export default PrintToPdf;
