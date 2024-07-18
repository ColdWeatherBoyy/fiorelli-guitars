/*
  Warnings:

  - Made the column `name` on table `GuitarSpec` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "GuitarSpec" ALTER COLUMN "name" SET NOT NULL;
