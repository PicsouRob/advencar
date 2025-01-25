"use client";

import { useEffect, useState } from 'react';

import SheetWrapper from '@/components/common/SheetWrapper';
import { getListData } from '@/utils/handleFetchAction';
import { Brand, FuelType, Model, Vehicle } from '@prisma/client';
import DetailRow from '@/components/common/DetailRow';
import { Separator } from '@/components/ui/separator';

type VehicleDetailSheetProps = {
    vehicle: Vehicle;
    children: React.ReactNode;
}

const VehicleDetailSheet: React.FC<VehicleDetailSheetProps> = ({
    vehicle, children
}) => {
    const [vehicleName, setVehicleName] = useState<string>("");
    const [brandName, setBrandName] = useState<string>("");
    const [modelName, setModelName] = useState<string>("");
    const [fuelTypeName, setFuelTypeName] = useState<string>("");

    useEffect(() => {
        const getDats = async () => { 
            const brand = (await getListData<Brand>("/api/brand"));
            const findedBrand = brand.find((brand) => brand.id === vehicle.brandId);
            const model = (await getListData<Model>("/api/model"));
            const findedModel = model.find((model) => model.id === vehicle.modelId);
            const fuelType = (await getListData<FuelType>("/api/fuel-type"));
            const findedFuelType = fuelType.find((fuelType) => fuelType.id === vehicle.fuelTypeId);
            const vehiclesTypes = (await getListData<Vehicle>("/api/vehicle-type"));
            const findedVehicleType = vehiclesTypes.find((vehicleType) => vehicleType.id === vehicle.vehicleTypeId);

            setVehicleName(findedVehicleType!.description);
            setBrandName(findedBrand!.description);
            setModelName(findedModel!.description);
            setFuelTypeName(findedFuelType!.description);
        }

        getDats();
    }, [vehicle]);

    return (
        <SheetWrapper
            title="Detalles del Vehículo"
            description={`Detalles del vehículo ${vehicle.description}.`}
            trigger={children}
        >
            <div className="space-y-3 overflow-auto mt-4">
                <DetailRow label="Descripción" value={vehicle.description} />
                <Separator />
                <DetailRow label="Numero de Placa" value={vehicle.plateNumber} />
                <Separator />
                <DetailRow label="Tipo de Vehículo" value={vehicleName} />
                <Separator />
                <DetailRow label="Marca" value={brandName} />
                <Separator />
                <DetailRow label="Modelo" value={modelName} />
                <Separator />
                <DetailRow label="Fuel Type" value={fuelTypeName} />
                <Separator />
                <DetailRow label="Estado" value={vehicle.status} />
                <Separator />
                <DetailRow label="numero de Chasis" value={vehicle.chassisNumber} />
                <Separator />
                <DetailRow label="Numero del Motor" value={vehicle.engineNumber} />
                <Separator />
            </div>  
        </SheetWrapper>
    );
}

export default VehicleDetailSheet