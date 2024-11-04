/*
  Warnings:

  - A unique constraint covering the columns `[galleryOrder]` on the table `VariantGuitarModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VariantGuitarModel_galleryOrder_key" ON "VariantGuitarModel"("galleryOrder");
