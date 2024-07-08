/*
  Warnings:

  - You are about to drop the `AuthUserEmails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AuthUserEmails";

-- CreateTable
CREATE TABLE "AuthUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "AuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_email_key" ON "AuthUser"("email");
