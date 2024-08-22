/*
  Warnings:

  - Made the column `tag` on table `PageContent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PageContent" ALTER COLUMN "tag" SET NOT NULL;
