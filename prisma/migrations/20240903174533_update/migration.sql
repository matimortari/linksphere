/*
  Warnings:

  - You are about to drop the column `label` on the `UserLink` table. All the data in the column will be lost.
  - Added the required column `title` to the `UserLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserLink" DROP COLUMN "label",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
