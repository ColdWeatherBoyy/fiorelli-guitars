/*
  Warnings:

  - You are about to drop the column `tags` on the `PageContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PageContent" DROP COLUMN "tags",
ADD COLUMN     "tag" TEXT;
