/*
  Warnings:

  - You are about to drop the column `sensitiveContent` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "sensitiveContent",
ADD COLUMN     "analyticsPaused" BOOLEAN NOT NULL DEFAULT false;
