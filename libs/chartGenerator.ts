import { Rent, VehicleType } from "@prisma/client";
import { prisma } from "./prisma.config";
import { MostVehicleRentedProps } from "@/types/chart";

export class ChartGenerator {
    async getRents(): Promise<Rent[]> {
        return await prisma.rent.findMany({
            include: { vehicle: true },
        });
    }

    async getVehiclesTypes(): Promise<VehicleType[]> {
        return await prisma.vehicleType.findMany();
    }

     /**
     * Get all vehicles by status
     * @param status String
     * @returns list of vehicles Vehicle[]
     */
    async getVehiculesByStatus(status: string) {
        return (await prisma.vehicle.findMany())
            .filter((vehicle) => vehicle.status === status);
    }

    /**
     * Get the most vehicles rented 
     * @returns MostVehicleRentedProps[] agrouped by Description
     */
    async getMostVehicleRented(): Promise<MostVehicleRentedProps[]> { 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rents: any[] = await this.getRents();
        const vehiclesType: VehicleType[] = await this.getVehiclesTypes();

        const mostRentedVehicles = Promise.all(
            vehiclesType.map(async (vehicleType) => {
                const vehiclesRented = rents.filter((rent) => rent.vehicle.vehicleTypeId === vehicleType.id);
                const totalRents = vehiclesRented.length;
                const moneyGenerated = vehiclesRented.reduce((acc, rent) => acc + rent.dailyRate * rent.days, 0);

                return {
                    vehicle: vehicleType.description,
                    total: totalRents,
                    moneyGenerated: moneyGenerated,
                };
            })
        );

        return mostRentedVehicles;
    }
}