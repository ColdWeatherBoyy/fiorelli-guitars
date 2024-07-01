/*
  Warnings:

  - You are about to drop the `AuthUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "AuthUser";

-- CreateTable
CREATE TABLE "AuthUserEmails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "AuthUserEmails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthUserEmails_email_key" ON "AuthUserEmails"("email");
