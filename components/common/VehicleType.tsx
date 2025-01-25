import Image from 'next/image';

import { vehicleTypeData } from '@/utils/vehicleTypeData';

const VehicleTypeDisponible: React.FC = () => {
    return (
        <div className="bg-white">
            <div className='max-w-7xl mx-auto py- px-4 sm:py-24 sm:px-6 lg:px-8 space-y-4'>
                <div className="">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        Lista de Vehículos Disponibles
                    </h1>
                    <p className="text-muted-foreground">
                        Aquí encontrarás todos los vehículos disponibles para alquilar.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {vehicleTypeData.map((type, index) => (
                        <div key={index} className="border rounded-md px-4 py-3 grid place-items-center animate-in fade-in-up">
                            <Image width={100} height={100}
                                className="rounded-lg"
                                src={type.image} alt=""
                            />

                            <h2
                                className="mt-4 text-xl font-medium leading-tight text-gray-900"
                            >
                                {type.name}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default VehicleTypeDisponible;