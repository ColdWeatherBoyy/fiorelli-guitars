/*
  Warnings:

  - You are about to drop the column `body1` on the `PageContent` table. All the data in the column will be lost.
  - You are about to drop the column `body2` on the `PageContent` table. All the data in the column will be lost.
  - You are about to drop the column `body3` on the `PageContent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PageContent" DROP COLUMN "body1",
DROP COLUMN "body2",
DROP COLUMN "body3",
ADD COLUMN     "bodies" TEXT[];
