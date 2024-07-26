/*
  Warnings:

  - You are about to drop the column `guitarSpecId` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `guitarSpecId` on the `VariantGuitarModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BaseGuitarModel" DROP CONSTRAINT "BaseGuitarModel_guitarSpecId_fkey";

-- DropForeignKey
ALTER TABLE "VariantGuitarModel" DROP CONSTRAINT "VariantGuitarModel_guitarSpecId_fkey";

-- DropIndex
DROP INDEX "BaseGuitarModel_guitarSpecId_key";

-- DropIndex
DROP INDEX "VariantGuitarModel_guitarSpecId_key";

-- AlterTable
ALTER TABLE "BaseGuitarModel" DROP COLUMN "guitarSpecId";

-- AlterTable
ALTER TABLE "VariantGuitarModel" DROP COLUMN "guitarSpecId";

-- AddForeignKey
ALTER TABLE "GuitarSpec" ADD CONSTRAINT "GuitarSpec_baseGuitarModelId_fkey" FOREIGN KEY ("baseGuitarModelId") REFERENCES "BaseGuitarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuitarSpec" ADD CONSTRAINT "GuitarSpec_variantGuitarModelId_fkey" FOREIGN KEY ("variantGuitarModelId") REFERENCES "VariantGuitarModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
