/*
  Warnings:

  - Made the column `updatedAt` on table `PageContent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PageContent" ALTER COLUMN "updatedAt" SET NOT NULL;
