/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `GuitarSpec` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tag` to the `GuitarSpec` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuitarSpec" ADD COLUMN     "tag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GuitarSpec_tag_key" ON "GuitarSpec"("tag");
