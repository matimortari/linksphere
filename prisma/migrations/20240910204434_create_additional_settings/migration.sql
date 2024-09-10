-- CreateEnum
CREATE TYPE "SupportBanner" AS ENUM ('NONE', 'LGBTQ_RIGHTS', 'ANTI_RACISM', 'MENTAL_HEALTH', 'CLIMATE_ACTION');

-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "sensitiveContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supportBanner" "SupportBanner" NOT NULL DEFAULT 'NONE';
