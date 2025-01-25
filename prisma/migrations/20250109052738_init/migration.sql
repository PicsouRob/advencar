-- CreateTable
CREATE TABLE "VehicleType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "VehicleType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FuelType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "FuelType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "chassisNumber" TEXT NOT NULL,
    "engineNumber" TEXT NOT NULL,
    "plateNumber" TEXT NOT NULL,
    "vehicleTypeId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    "fuelTypeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "creditCard" TEXT NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "personType" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "workShift" TEXT NOT NULL,
    "commissionPct" DOUBLE PRECISION NOT NULL,
    "hireDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "scratches" BOOLEAN NOT NULL,
    "fuelAmount" TEXT NOT NULL,
    "hasSpareTire" BOOLEAN NOT NULL,
    "hasJack" BOOLEAN NOT NULL,
    "hasGlassDamage" BOOLEAN NOT NULL,
    "tireStatus" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "employeeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "rentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "dailyRate" DOUBLE PRECISION NOT NULL,
    "days" INTEGER NOT NULL,
    "comments" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Model" ADD CONSTRAINT "Model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_fuelTypeId_fkey" FOREIGN KEY ("fuelTypeId") REFERENCES "FuelType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
