/*
  Warnings:

  - You are about to drop the column `baseModelId` on the `GuitarSpec` table. All the data in the column will be lost.
  - You are about to drop the column `variantModelId` on the `GuitarSpec` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[guitarSpecId]` on the table `BaseGuitarModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[baseGuitarModelId]` on the table `GuitarSpec` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantGuitarModelId]` on the table `GuitarSpec` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[guitarSpecId]` on the table `VariantGuitarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "GuitarSpec" DROP CONSTRAINT "GuitarSpec_baseModelId_fkey";

-- DropForeignKey
ALTER TABLE "GuitarSpec" DROP CONSTRAINT "GuitarSpec_variantModelId_fkey";

-- DropIndex
DROP INDEX "GuitarSpec_baseModelId_key";

-- DropIndex
DROP INDEX "GuitarSpec_variantModelId_key";

-- AlterTable
ALTER TABLE "BaseGuitarModel" ADD COLUMN     "guitarSpecId" INTEGER;

-- AlterTable
ALTER TABLE "GuitarSpec" DROP COLUMN "baseModelId",
DROP COLUMN "variantModelId",
ADD COLUMN     "baseGuitarModelId" INTEGER,
ADD COLUMN     "variantGuitarModelId" INTEGER;

-- AlterTable
ALTER TABLE "VariantGuitarModel" ADD COLUMN     "guitarSpecId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "BaseGuitarModel_guitarSpecId_key" ON "BaseGuitarModel"("guitarSpecId");

-- CreateIndex
CREATE UNIQUE INDEX "GuitarSpec_baseGuitarModelId_key" ON "GuitarSpec"("baseGuitarModelId");

-- CreateIndex
CREATE UNIQUE INDEX "GuitarSpec_variantGuitarModelId_key" ON "GuitarSpec"("variantGuitarModelId");

-- CreateIndex
CREATE UNIQUE INDEX "VariantGuitarModel_guitarSpecId_key" ON "VariantGuitarModel"("guitarSpecId");

-- AddForeignKey
ALTER TABLE "BaseGuitarModel" ADD CONSTRAINT "BaseGuitarModel_guitarSpecId_fkey" FOREIGN KEY ("guitarSpecId") REFERENCES "GuitarSpec"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantGuitarModel" ADD CONSTRAINT "VariantGuitarModel_guitarSpecId_fkey" FOREIGN KEY ("guitarSpecId") REFERENCES "GuitarSpec"("id") ON DELETE SET NULL ON UPDATE CASCADE;
