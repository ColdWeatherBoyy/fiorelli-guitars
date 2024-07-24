/*
  Warnings:

  - You are about to drop the column `body` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `bridge` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `bridgePickup` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `customFeatures` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fingerboard` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fingerboardRadius` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fretMarkers` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `knobs` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `middlePickup` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `neck` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `neckPickup` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `pickupSwitch` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `scaleLength` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `tuners` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `vibrato` on the `BaseGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `bridge` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `bridgePickup` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `customFeatures` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fingerboard` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fingerboardRadius` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `fretMarkers` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `knobs` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `middlePickup` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `neck` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `neckPickup` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `pickupSwitch` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `scaleLength` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `tuners` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - You are about to drop the column `vibrato` on the `VariantGuitarModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `BaseGuitarModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guitarSpecId` to the `BaseGuitarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guitarSpecId` to the `VariantGuitarModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BaseGuitarModel" DROP COLUMN "body",
DROP COLUMN "bridge",
DROP COLUMN "bridgePickup",
DROP COLUMN "customFeatures",
DROP COLUMN "fingerboard",
DROP COLUMN "fingerboardRadius",
DROP COLUMN "fretMarkers",
DROP COLUMN "knobs",
DROP COLUMN "middlePickup",
DROP COLUMN "neck",
DROP COLUMN "neckPickup",
DROP COLUMN "pickupSwitch",
DROP COLUMN "scaleLength",
DROP COLUMN "tuners",
DROP COLUMN "vibrato",
ADD COLUMN     "guitarSpecId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VariantGuitarModel" DROP COLUMN "body",
DROP COLUMN "bridge",
DROP COLUMN "bridgePickup",
DROP COLUMN "customFeatures",
DROP COLUMN "fingerboard",
DROP COLUMN "fingerboardRadius",
DROP COLUMN "fretMarkers",
DROP COLUMN "knobs",
DROP COLUMN "middlePickup",
DROP COLUMN "neck",
DROP COLUMN "neckPickup",
DROP COLUMN "pickupSwitch",
DROP COLUMN "scaleLength",
DROP COLUMN "tuners",
DROP COLUMN "vibrato",
ADD COLUMN     "guitarSpecId" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "GuitarSpec" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "GuitarSpec_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BaseGuitarModel_name_key" ON "BaseGuitarModel"("name");

-- AddForeignKey
ALTER TABLE "BaseGuitarModel" ADD CONSTRAINT "BaseGuitarModel_guitarSpecId_fkey" FOREIGN KEY ("guitarSpecId") REFERENCES "GuitarSpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VariantGuitarModel" ADD CONSTRAINT "VariantGuitarModel_guitarSpecId_fkey" FOREIGN KEY ("guitarSpecId") REFERENCES "GuitarSpec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
