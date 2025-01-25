/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ASSISTANT', 'ADMIN');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ASSISTANT';

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");
