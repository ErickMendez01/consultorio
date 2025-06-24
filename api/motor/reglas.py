from experta import Rule, Fact, AND, MATCH

class ReglasDiagnostico:
    @Rule(
        AND(
            Fact(tipo="signo", nombre="fiebre"),
            Fact(tipo="sintoma", nombre="dolor de cabeza"),
            Fact(tipo="sintoma", nombre="fatiga")
        )
    )
    def diagnostico_dengue(self):
        self.resultado = "Dengue"

    @Rule(
        AND(
            Fact(tipo="signo", nombre="tos"),
            Fact(tipo="sintoma", nombre="dificultad para respirar")
        )
    )
    def diagnostico_neumonia(self):
        self.resultado = "Neumonía"

    @Rule(
        AND(
            Fact(tipo="signo", nombre="fiebre"),
            Fact(tipo="sintoma", nombre="nauseas")
        )
    )
    def diagnostico_gripe(self):
        self.resultado = "Gripe"

    # Reglas más complejas que utilizan campos adicionales

    @Rule(
        AND(
            Fact(tipo="signo", nombre="fiebre"),
            Fact(tipo="sintoma", gravedad="grave", nombre="dolor de cabeza")
        )
    )
    def posible_meningitis(self):
        self.resultado = "Posible meningitis"

    @Rule(
        AND(
            Fact(tipo="signo", nombre="fiebre"),
            Fact(tipo="prueba", metodo="laboratorio")
        )
    )
    def evaluar_infeccion(self):
        self.resultado = "Evaluar posible infección"
    
    @Rule(
        AND(
            Fact(tipo="signo", nombre="glucosa en sangre"),
            Fact(tipo="sintoma", nombre="sed"),
            Fact(tipo="sintoma", nombre="miccion")
        )
    )
    def diagnostico_diabetes(self):
        self.resultado = "Diabetes"

    @Rule(
        AND(
            Fact(tipo="signo", nombre="presion arterial"),
            Fact(tipo="sintoma", nombre="dolor de cabeza"),
            Fact(tipo="sintoma", nombre="mareos")
        )
    )
    def diagnostico_hipertension(self):
        self.resultado = "Hipertensión arterial"

    @Rule(
        AND(
            Fact(tipo="signo", nombre="fiebre"),
            Fact(tipo="signo", nombre="tos"),
            Fact(tipo="sintoma", nombre="dolor muscular"),
        )
    )
    def diagnostico_gripe(self):
        self.resultado = "Gripe"

    @Rule(
      AND(
            Fact(tipo="signo", nombre="inflamacion", tipoSigno=MATCH.tipo_signo),
            Fact(tipo="sintoma", nombre="dolor articular", gravedad=MATCH.gravedad1),
            Fact(tipo="sintoma", nombre="rigidez", gravedad=MATCH.gravedad2)
        )
    )
    def diagnostico_artritis(self, tipo_signo, gravedad1, gravedad2):
        print(">>> Regla de Artritis activada con:", tipo_signo, gravedad1, gravedad2)
        self.resultado = "Artritis"

