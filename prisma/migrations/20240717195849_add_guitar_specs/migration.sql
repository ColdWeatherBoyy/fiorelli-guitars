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
    "bridgePickup" TEXT NOT NULL,
    "pickupSwitch" TEXT NOT NULL,
    "bridge" TEXT NOT NULL,
    "tuners" TEXT NOT NULL,
    "knobs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuitarSpec_pkey" PRIMARY KEY ("id")
);
