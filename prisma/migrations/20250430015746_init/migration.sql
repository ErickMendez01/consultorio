-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'medico');

-- CreateEnum
CREATE TYPE "MetodoPrueba" AS ENUM ('laboratorio', 'postmortem');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL DEFAULT 'medico',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "direccion" TEXT,
    "telefono" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enfermedad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "causa" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enfermedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Signo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "unidadMedida" TEXT,
    "rangoNormal" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Signo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sintoma" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "gravedad" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sintoma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "enfermedadId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resultado" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "pruebaId" INTEGER NOT NULL,
    "valor" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observaciones" TEXT,

    CONSTRAINT "Resultado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historial" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observaciones" TEXT,

    CONSTRAINT "Historial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prueba" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "metodo" "MetodoPrueba" NOT NULL,
    "unidadMedida" TEXT,
    "rangoNormal" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prueba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignoPaciente" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "signoId" INTEGER NOT NULL,
    "valor" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SignoPaciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SintomaPaciente" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "sintomaId" INTEGER NOT NULL,
    "gravedad" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SintomaPaciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignoEnfermedad" (
    "id" SERIAL NOT NULL,
    "signoId" INTEGER NOT NULL,
    "enfermedadId" INTEGER NOT NULL,

    CONSTRAINT "SignoEnfermedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SintomaEnfermedad" (
    "id" SERIAL NOT NULL,
    "sintomaId" INTEGER NOT NULL,
    "enfermedadId" INTEGER NOT NULL,

    CONSTRAINT "SintomaEnfermedad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PruebaEnfermedad" (
    "id" SERIAL NOT NULL,
    "pruebaId" INTEGER NOT NULL,
    "enfermedadId" INTEGER NOT NULL,

    CONSTRAINT "PruebaEnfermedad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_codigo_key" ON "User"("codigo");

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_enfermedadId_fkey" FOREIGN KEY ("enfermedadId") REFERENCES "Enfermedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resultado" ADD CONSTRAINT "Resultado_pruebaId_fkey" FOREIGN KEY ("pruebaId") REFERENCES "Prueba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historial" ADD CONSTRAINT "Historial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignoPaciente" ADD CONSTRAINT "SignoPaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignoPaciente" ADD CONSTRAINT "SignoPaciente_signoId_fkey" FOREIGN KEY ("signoId") REFERENCES "Signo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SintomaPaciente" ADD CONSTRAINT "SintomaPaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SintomaPaciente" ADD CONSTRAINT "SintomaPaciente_sintomaId_fkey" FOREIGN KEY ("sintomaId") REFERENCES "Sintoma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignoEnfermedad" ADD CONSTRAINT "SignoEnfermedad_signoId_fkey" FOREIGN KEY ("signoId") REFERENCES "Signo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignoEnfermedad" ADD CONSTRAINT "SignoEnfermedad_enfermedadId_fkey" FOREIGN KEY ("enfermedadId") REFERENCES "Enfermedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SintomaEnfermedad" ADD CONSTRAINT "SintomaEnfermedad_sintomaId_fkey" FOREIGN KEY ("sintomaId") REFERENCES "Sintoma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SintomaEnfermedad" ADD CONSTRAINT "SintomaEnfermedad_enfermedadId_fkey" FOREIGN KEY ("enfermedadId") REFERENCES "Enfermedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PruebaEnfermedad" ADD CONSTRAINT "PruebaEnfermedad_pruebaId_fkey" FOREIGN KEY ("pruebaId") REFERENCES "Prueba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PruebaEnfermedad" ADD CONSTRAINT "PruebaEnfermedad_enfermedadId_fkey" FOREIGN KEY ("enfermedadId") REFERENCES "Enfermedad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
