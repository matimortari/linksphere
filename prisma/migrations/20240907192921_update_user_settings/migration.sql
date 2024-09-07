/*
  Warnings:

  - The primary key for the `UserSettings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `borderColor` on the `UserSettings` table. All the data in the column will be lost.
  - You are about to drop the column `shadowColor` on the `UserSettings` table. All the data in the column will be lost.
  - The `id` column on the `UserSettings` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `linkBackgroundColor` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkTextColor` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkHoverBackgroundColor` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `headerTextColor` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkBorderRadius` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.
  - Made the column `linkPadding` on table `UserSettings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_userId_fkey";

-- AlterTable
ALTER TABLE "UserSettings" DROP CONSTRAINT "UserSettings_pkey",
DROP COLUMN "borderColor",
DROP COLUMN "shadowColor",
ADD COLUMN     "backgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "linkShadowColor" TEXT NOT NULL DEFAULT '#000000',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "linkBackgroundColor" SET NOT NULL,
ALTER COLUMN "linkBackgroundColor" SET DEFAULT '#ffffff',
ALTER COLUMN "linkTextColor" SET NOT NULL,
ALTER COLUMN "linkTextColor" SET DEFAULT '#000000',
ALTER COLUMN "linkHoverBackgroundColor" SET NOT NULL,
ALTER COLUMN "linkHoverBackgroundColor" SET DEFAULT '#eeeeee',
ALTER COLUMN "headerTextColor" SET NOT NULL,
ALTER COLUMN "headerTextColor" SET DEFAULT '#000000',
ALTER COLUMN "linkBorderRadius" SET NOT NULL,
ALTER COLUMN "linkBorderRadius" SET DEFAULT '4px',
ALTER COLUMN "linkPadding" SET NOT NULL,
ALTER COLUMN "linkPadding" SET DEFAULT '4px',
ADD CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
