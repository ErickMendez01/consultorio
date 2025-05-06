/*
  Warnings:

  - You are about to drop the column `valor` on the `SignoPaciente` table. All the data in the column will be lost.
  - You are about to drop the column `gravedad` on the `SintomaPaciente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pacienteId,signoId]` on the table `SignoPaciente` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pacienteId,sintomaId]` on the table `SintomaPaciente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SignoPaciente" DROP COLUMN "valor";

-- AlterTable
ALTER TABLE "SintomaPaciente" DROP COLUMN "gravedad";

-- CreateIndex
CREATE UNIQUE INDEX "SignoPaciente_pacienteId_signoId_key" ON "SignoPaciente"("pacienteId", "signoId");

-- CreateIndex
CREATE UNIQUE INDEX "SintomaPaciente_pacienteId_sintomaId_key" ON "SintomaPaciente"("pacienteId", "sintomaId");
