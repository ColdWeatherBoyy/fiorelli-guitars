/*
  Warnings:

  - You are about to drop the `PageVersion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PageVersion" DROP CONSTRAINT "PageVersion_pageId_fkey";

-- DropTable
DROP TABLE "PageVersion";

-- CreateTable
CREATE TABLE "PageContent" (
    "id" SERIAL NOT NULL,
    "pageId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "body1" TEXT NOT NULL,
    "body2" TEXT,
    "body3" TEXT,
    "signature" TEXT,
    "email" TEXT,
    "isBackup" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageContent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PageContent" ADD CONSTRAINT "PageContent_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
