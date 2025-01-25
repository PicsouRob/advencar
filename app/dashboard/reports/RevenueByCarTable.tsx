import { useEffect, useState } from "react";

import { Brand, Model, Rent, Vehicle, VehicleType } from "@prisma/client";
import { getListData } from "@/utils/handleFetchAction";

type RevenueByCarTableProps = {
    rents: Rent[];
}

type TotalIncomesByVehicle = {
    name: string;
    type: string;
    brand: string;
    model: string;
    rentedTimes: number;
    revenue: number;
    plateNumber: string;
}

const RevenueByCarTable: React.FC<RevenueByCarTableProps> = ({
    rents
}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        const fetchRents = async () => { 
            const listOfVehicles = await getListData<Vehicle>("/api/vehicle");
            const listOfBrands = await getListData<Brand>("/api/brand");
            const listOfModels = await getListData<Model>("/api/model");
            const listOfVehicleTypes = await getListData<VehicleType>("/api/vehicle-type");
          
            setVehicles(listOfVehicles);
            setBrands(listOfBrands);
            setVehicleTypes(listOfVehicleTypes);
            setModels(listOfModels);
        }
        
        fetchRents();
    }, []);
    
    /**
     * get the total incomes for each vehicle
     * @return TotalIncomesByVehicle[]
    */
    const getTotalIncomesByVehicle = (): TotalIncomesByVehicle[] => {
        return vehicles.map(vehicle => {
            // The rents of the actual vehicle
            const vehicleRents = rents.filter(rent => rent.vehicleId === vehicle.id);

            // Calculate the total revenue and rented times of the vehicle
            const { totalRevenue, rentedTimes } = vehicleRents.reduce((acc, rent) => {
                acc.totalRevenue += rent.days * rent.dailyRate;
                acc.rentedTimes++;

                return acc;
            }, { totalRevenue: 0, rentedTimes: 0 });

            return {
                name: vehicle.description,
                plateNumber: vehicle.plateNumber,
                type: vehicleTypes.find((vehicleType) => vehicleType.id === vehicle.vehicleTypeId)!.description,
                brand: brands.find((brand) => brand.id === vehicle.brandId)!.description,
                model: models.find((model) => model.id === vehicle.modelId)!.description,
                rentedTimes,
                revenue: totalRevenue
            };
        });
    }

    return (
        <div className="space-y-4">
            <h1 className="font-bold">Estadísticos de ingresos por vehículo</h1>

            <div className="overflow-hidden border rounded-lg border-gray-300">
                <div className="flex items-center justify-between gap-4 p-5">
                    <h2 className="font-bold">Total ingresos</h2>

                    <p className="font-semibold">{ "$" } { getTotalIncomesByVehicle().reduce((acc, vehicle) => acc + vehicle.revenue, 0) }</p>
                </div>

                <table className=" min-w-full  rounded-xl">
                    <thead>
                        <tr className="bg-gray-50">
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Placa </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Descripción </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Tipo de vehiculo </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Marca </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Modelo </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Cantidad de alquileres </th>
                            <th scope="col" className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"> Ingresos </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-300">
                        {getTotalIncomesByVehicle().map((vehicle, index) => (
                            <tr key={index} className="">
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.plateNumber}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.name}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.type}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.brand}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.model}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                                >
                                    {vehicle.rentedTimes}
                                </td>
                                <td
                                    className="p-5 whitespace-nowrap text-sm leading-6 text-gray-900 font-semibold"
                                >
                                    ${vehicle.revenue}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RevenueByCarTable