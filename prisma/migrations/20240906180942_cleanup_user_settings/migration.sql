/*
  Warnings:

  - You are about to drop the column `description` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `UserSettings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserSettings" DROP COLUMN "description",
DROP COLUMN "profileImage";
