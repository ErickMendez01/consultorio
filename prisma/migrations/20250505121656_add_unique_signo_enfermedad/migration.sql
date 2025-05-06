/*
  Warnings:

  - A unique constraint covering the columns `[pruebaId,enfermedadId]` on the table `PruebaEnfermedad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signoId,enfermedadId]` on the table `SignoEnfermedad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sintomaId,enfermedadId]` on the table `SintomaEnfermedad` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PruebaEnfermedad_pruebaId_enfermedadId_key" ON "PruebaEnfermedad"("pruebaId", "enfermedadId");

-- CreateIndex
CREATE UNIQUE INDEX "SignoEnfermedad_signoId_enfermedadId_key" ON "SignoEnfermedad"("signoId", "enfermedadId");

-- CreateIndex
CREATE UNIQUE INDEX "SintomaEnfermedad_sintomaId_enfermedadId_key" ON "SintomaEnfermedad"("sintomaId", "enfermedadId");
