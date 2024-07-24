/*
  Warnings:

  - Added the required column `gallery` to the `VariantGuitarModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VariantGuitarModel" ADD COLUMN     "gallery" BOOLEAN NOT NULL;
