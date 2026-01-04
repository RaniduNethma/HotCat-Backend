/*
  Warnings:

  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "priceListId" INTEGER,
ADD COLUMN     "profileType" "ProfileType" NOT NULL DEFAULT 'BRONZE';

-- DropTable
DROP TABLE "Profile";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_priceListId_fkey" FOREIGN KEY ("priceListId") REFERENCES "PriceList"("id") ON DELETE SET NULL ON UPDATE CASCADE;
