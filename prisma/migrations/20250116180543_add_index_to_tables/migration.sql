-- CreateIndex
CREATE INDEX "Brand_description_idx" ON "Brand"("description");

-- CreateIndex
CREATE INDEX "Customer_documentId_idx" ON "Customer"("documentId");

-- CreateIndex
CREATE INDEX "Employee_documentId_idx" ON "Employee"("documentId");

-- CreateIndex
CREATE INDEX "FuelType_description_idx" ON "FuelType"("description");

-- CreateIndex
CREATE INDEX "Model_description_idx" ON "Model"("description");

-- CreateIndex
CREATE INDEX "Rent_vehicleId_idx" ON "Rent"("vehicleId");

-- CreateIndex
CREATE INDEX "VehicleType_description_idx" ON "VehicleType"("description");
