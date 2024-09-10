-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "buttonBackgroundColor" TEXT NOT NULL DEFAULT '#ffffff',
ADD COLUMN     "buttonHoverBackgroundColor" TEXT NOT NULL DEFAULT '#eeeeee',
ADD COLUMN     "buttonIconColor" TEXT NOT NULL DEFAULT '#1e1e1e',
ADD COLUMN     "buttonShadowColor" TEXT NOT NULL DEFAULT '#e7e5e5';
