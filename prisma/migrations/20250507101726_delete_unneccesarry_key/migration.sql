/*
  Warnings:

  - You are about to drop the column `enfermedadId` on the `Diagnostico` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diagnostico" DROP CONSTRAINT "Diagnostico_enfermedadId_fkey";

-- AlterTable
ALTER TABLE "Diagnostico" DROP COLUMN "enfermedadId";
