/*
  Warnings:

  - You are about to drop the column `isBackup` on the `PageContent` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pageId]` on the table `PageContent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PageContent" DROP CONSTRAINT "PageContent_pageId_fkey";

-- AlterTable
ALTER TABLE "PageContent" DROP COLUMN "isBackup";

-- CreateIndex
CREATE UNIQUE INDEX "PageContent_pageId_key" ON "PageContent"("pageId");

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;
