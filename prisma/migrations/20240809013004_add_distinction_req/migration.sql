/*
  Warnings:

  - Made the column `distinction` on table `VariantGuitarModel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VariantGuitarModel" ALTER COLUMN "distinction" SET NOT NULL;
