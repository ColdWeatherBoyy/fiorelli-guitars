-- AlterTable
ALTER TABLE "GuitarSpec" ADD COLUMN     "vibrato" TEXT,
ALTER COLUMN "bridgePickup" DROP NOT NULL,
ALTER COLUMN "pickupSwitch" DROP NOT NULL,
ALTER COLUMN "knobs" DROP NOT NULL;
