/*
  Warnings:

  - You are about to drop the column `version` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `PageContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "version";

-- AlterTable
ALTER TABLE "PageContent" DROP COLUMN "title";
