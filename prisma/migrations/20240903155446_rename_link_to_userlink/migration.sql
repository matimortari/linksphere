/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropTable
DROP TABLE "Link";

-- CreateTable
CREATE TABLE "UserLink" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserLink_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLink" ADD CONSTRAINT "UserLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
