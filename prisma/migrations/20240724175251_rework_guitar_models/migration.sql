/*
  Warnings:

  - You are about to drop the `GuitarSpec` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GuitarSpec";

-- CreateTable
CREATE TABLE "BaseGuitarModel" (
    "id" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "neck" TEXT NOT NULL,
    "fingerboard" TEXT NOT NULL,
    "fingerboardRadius" TEXT NOT NULL,
    "scaleLength" TEXT NOT NULL,
    "fretMarkers" TEXT NOT NULL,
    "neckPickup" TEXT NOT NULL,
    "middlePickup" TEXT,
    "bridgePickup" TEXT,
    "pickupSwitch" TEXT,
    "bridge" TEXT NOT NULL,
    "vibrato" TEXT,
    "tuners" TEXT NOT NULL,
    "knobs" TEXT,
    "customFeatures" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaseGuitarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VariantGuitarModel" (
    "id" SERIAL NOT NULL,
    "baseModelId" INTEGER NOT NULL,
    "variantTag" TEXT NOT NULL,
    "colorScheme" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "neck" TEXT NOT NULL,
    "fingerboard" TEXT NOT NULL,
    "fingerboardRadius" TEXT NOT NULL,
    "scaleLength" TEXT NOT NULL,
    "fretMarkers" TEXT NOT NULL,
    "neckPickup" TEXT NOT NULL,
    "middlePickup" TEXT,
    "bridgePickup" TEXT,
    "pickupSwitch" TEXT,
    "bridge" TEXT NOT NULL,
    "vibrato" TEXT,
    "tuners" TEXT NOT NULL,
    "knobs" TEXT,
    "customFeatures" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VariantGuitarModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseGuitarModel_tag_key" ON "BaseGuitarModel"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "VariantGuitarModel_variantTag_key" ON "VariantGuitarModel"("variantTag");

-- AddForeignKey
ALTER TABLE "VariantGuitarModel" ADD CONSTRAINT "VariantGuitarModel_baseModelId_fkey" FOREIGN KEY ("baseModelId") REFERENCES "BaseGuitarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
