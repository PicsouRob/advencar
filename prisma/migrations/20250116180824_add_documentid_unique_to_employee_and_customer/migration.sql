/*
  Warnings:

  - A unique constraint covering the columns `[documentId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[documentId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_documentId_key" ON "Customer"("documentId");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_documentId_key" ON "Employee"("documentId");
