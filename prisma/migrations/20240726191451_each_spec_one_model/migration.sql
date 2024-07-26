/*
  Warnings:

  - You are about to drop the column `guitarSpecId` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `guitarSpecId` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[baseModelId]` on the table `GuitarSpec` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[variantModelId]` on the table `GuitarSpec` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BaseGuitarModel" DROP CONSTRAINT "BaseGuitarModel_guitarSpecId_fkey";

-- DropForeignKey
ALTER TABLE "VariantGuitarModel" DROP CONSTRAINT "VariantGuitarModel_guitarSpecId_fkey";

-- AlterTable
ALTER TABLE "BaseGuitarModel" DROP COLUMN "guitarSpecId";

-- AlterTable
ALTER TABLE "GuitarSpec" ADD COLUMN     "baseModelId" INTEGER,
ADD COLUMN     "variantModelId" INTEGER;

-- AlterTable
ALTER TABLE "VariantGuitarModel" DROP COLUMN "guitarSpecId",
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "GuitarSpec_baseModelId_key" ON "GuitarSpec"("baseModelId");

-- CreateIndex
CREATE UNIQUE INDEX "GuitarSpec_variantModelId_key" ON "GuitarSpec"("variantModelId");

-- AddForeignKey
ALTER TABLE "GuitarSpec" ADD CONSTRAINT "GuitarSpec_baseModelId_fkey" FOREIGN KEY ("baseModelId") REFERENCES "BaseGuitarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuitarSpec" ADD CONSTRAINT "GuitarSpec_variantModelId_fkey" FOREIGN KEY ("variantModelId") REFERENCES "VariantGuitarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
