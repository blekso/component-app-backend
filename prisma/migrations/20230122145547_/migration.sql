/*
  Warnings:

  - Added the required column `star` to the `UserReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserReview" ADD COLUMN     "star" INTEGER NOT NULL;
