/*
  Warnings:

  - You are about to drop the column `platformId` on the `CapturedEvents` table. All the data in the column will be lost.
  - You are about to drop the `PlatformsForIntegration` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `platform` to the `CapturedEvents` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CapturedEvents" DROP CONSTRAINT "CapturedEvents_platformId_fkey";

-- AlterTable
ALTER TABLE "CapturedEvents" DROP COLUMN "platformId",
ADD COLUMN     "platform" TEXT NOT NULL;

-- DropTable
DROP TABLE "PlatformsForIntegration";
