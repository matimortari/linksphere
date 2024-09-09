-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "linkTextColor" SET DEFAULT '#1e1e1e',
ALTER COLUMN "headerTextColor" SET DEFAULT '#1e1e1e',
ALTER COLUMN "linkBorderRadius" SET DEFAULT '0.5rem',
ALTER COLUMN "linkPadding" SET DEFAULT '0.5rem',
ALTER COLUMN "backgroundColor" SET DEFAULT '#e7e5e5',
ALTER COLUMN "linkShadowColor" SET DEFAULT '#e7e5e5',
ALTER COLUMN "slugTextColor" SET DEFAULT '#1e1e1e',
ALTER COLUMN "slugTextSize" SET DEFAULT '1rem',
ALTER COLUMN "slugTextWeight" SET DEFAULT '500';

-- CreateTable
CREATE TABLE "SocialButton" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialButton_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialButton" ADD CONSTRAINT "SocialButton_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
