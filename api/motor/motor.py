from experta import KnowledgeEngine, Fact
from motor.reglas import ReglasDiagnostico

class DiagnosticoEngine:
    def inferir(self, paciente, prueba):
        engine = MotorInterno()

        # Ejecutar el reset antes de declarar los hechos
        engine.reset()

        # Declarar hechos de signos, excluyendo los campos no relevantes
        for item in paciente.get("signos", []):
            nombre_signo = item.get("nombre", "").strip().lower()  # Asegurarse de que no haya espacios extra
            tipo_signo = item.get("tipo", "").strip().lower()  # Excluir 'id', 'unidadMedida' y 'rangoNormal'
            print(f"Declarando signo: {nombre_signo} de tipo {tipo_signo}")  # Depuración
            engine.declare(Fact(
                tipo="signo",
                nombre=nombre_signo,
                tipoSigno=tipo_signo
            ))

        # Declarar hechos de síntomas, excluyendo los campos no relevantes
        for item in paciente.get("sintomas", []):
            nombre_sintoma = item.get("nombre", "").strip().lower()  # Asegurarse de que no haya espacios extra
            gravedad = item.get("gravedad", "").strip().lower()  # Excluir 'id'
            print(f"Declarando síntoma: {nombre_sintoma} de gravedad {gravedad}")  # Depuración
            engine.declare(Fact(
                tipo="sintoma",
                nombre=nombre_sintoma,
                gravedad=gravedad
            ))

        # Declarar hecho de la prueba, validando el campo 'metodo'
        if prueba:
            metodo = prueba.get("metodo", "").strip().lower()
            if metodo not in ["laboratorio", "postmortem"]:
                return "Método de prueba inválido"  # Validación de 'metodo'
            prueba_nombre = prueba.get("nombre", "").strip().lower()
            print(f"Declarando prueba: {prueba_nombre} con método {metodo}")  # Depuración
            engine.declare(Fact(
                tipo="prueba",
                nombre=prueba_nombre,
                metodo=metodo
            ))

        # Ejecutar las reglas de inferencia
        engine.run()

        # Devolver diagnóstico o mensaje por defecto
        return engine.resultado or "No se pudo determinar un diagnóstico"

class MotorInterno(ReglasDiagnostico, KnowledgeEngine):
    def __init__(self):
        super().__init__()
        self.resultado = None
