/*
  Warnings:

  - Made the column `maxStudents` on table `availability_slots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bookedStudents` on table `availability_slots` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isActive` on table `availability_slots` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BookingStatus" ADD VALUE 'PENDING';
ALTER TYPE "BookingStatus" ADD VALUE 'REJECTED';

-- DropForeignKey
ALTER TABLE "availability_slots" DROP CONSTRAINT "availability_slots_tutorId_fkey";

-- AlterTable
ALTER TABLE "availability_slots" ALTER COLUMN "maxStudents" SET NOT NULL,
ALTER COLUMN "bookedStudents" SET NOT NULL,
ALTER COLUMN "isActive" SET NOT NULL;

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
