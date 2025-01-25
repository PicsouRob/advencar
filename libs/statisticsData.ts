import { Rent } from "@prisma/client";

export class StatisticsData { 
    private rents: Rent[] = [];

    constructor(rents: Rent[]) {
        this.rents = rents;
    }

    /**
     * Get total rents for the day
     * @returns number
     */
    public getTotalRentsForDay(day: number = new Date().getDate()): number {
        return this.rents.filter((rent) => new Date(rent.rentDate).getDate() === day).length;
    }

    /**
     * Get total rents for the week
     * @returns number
     */
    public getTotalRentsForWeek(week: number = new Date().getDay()): number {
        return this.rents.filter((rent) => new Date(rent.rentDate).getDay() === week).length;
    }

    /**
     * Get total rents for the month
     * @returns number
     */
    public getTotalRentsForMonth(month: number = new Date().getMonth()): number {
        return this.rents.filter((rent) => new Date(rent.rentDate).getMonth() === month).length;
    }

    /**
     * Get total rents for the year
     * @returns number
     */
    public getTotalRentsForYear(year: number = new Date().getFullYear()): number {
        return this.rents.filter((rent) => new Date(rent.rentDate).getFullYear() === year).length;
    }

    /**
     * Get total incomes for the day
     * @returns the total money incomes (days * dailyRate) for the day
     */
    public getTotalIncomesForDay(day: number = new Date().getDate()): number {
        return this.rents
            .filter((rent) => new Date(rent.rentDate).getDate() === day)
            .reduce((acc, rent) => acc + (rent.days * rent.dailyRate), 0);
    }

    /**
     * Get total incomes for the week
     * @returns the total money incomes (days * dailyRate) for the week
     */
    public getTotalIncomesForWeek(week: number = new Date().getDay()): number {
        return this.rents
            .filter((rent) => new Date(rent.rentDate).getDay() === week)
            .reduce((acc, rent) => acc + (rent.days * rent.dailyRate), 0);
    }

    /**
     * Get total incomes for the month
     * @returns the total money incomes (days * dailyRate) for the month
     */
    public getTotalIncomesForMonth(month: number = new Date().getMonth()): number {
        return this.rents
            .filter((rent) => new Date(rent.rentDate).getMonth() === month)
            .reduce((acc, rent) => acc + (rent.days * rent.dailyRate), 0);
    }

    /**
     * Get total incomes for the year
     * @returns the total money incomes (days * dailyRate) for the year
     */
    public getTotalIncomesForYear(year: number = new Date().getFullYear()): number {
        return this.rents
            .filter((rent) => new Date(rent.rentDate).getFullYear() === year)
            .reduce((acc, rent) => acc + (rent.days * rent.dailyRate), 0);
    }
};
