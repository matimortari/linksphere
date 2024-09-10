/*
  Warnings:

  - Added the required column `platform` to the `SocialButton` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SocialButton" ADD COLUMN     "platform" TEXT NOT NULL;
