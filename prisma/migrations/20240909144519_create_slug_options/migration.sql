-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "slugTextColor" TEXT NOT NULL DEFAULT '#000000',
ADD COLUMN     "slugTextSize" TEXT NOT NULL DEFAULT '24px',
ADD COLUMN     "slugTextWeight" TEXT NOT NULL DEFAULT 'bold';
