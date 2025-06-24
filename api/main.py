from flask import Flask, request, jsonify
from flask_cors import CORS
from motor.motor import DiagnosticoEngine
import os
import json

app = Flask(__name__)
CORS(app)

@app.route("/api/inferencia", methods=["POST"])
def inferencia():
    data = request.get_json()
    paciente = data.get("paciente")
    prueba = data.get("prueba")

    # Mostrar los datos recibidos en consola
    print("\n🔍 Datos recibidos del frontend:")
    print("Paciente:")
    print(json.dumps(paciente, indent=2, ensure_ascii=False))
    print("Prueba:")
    print(json.dumps(prueba, indent=2, ensure_ascii=False))

    # Validación de los datos recibidos
    if not paciente or not isinstance(paciente, dict) or "id" not in paciente:
        return jsonify({"error": "Datos del paciente inválidos"}), 400

    if not prueba or not isinstance(prueba, dict) or "id" not in prueba:
        return jsonify({"error": "Datos de la prueba inválidos"}), 400

    try:
        # Inicialización del motor de diagnóstico
        motor = DiagnosticoEngine()
        enfermedad = motor.inferir(paciente, prueba)
    except Exception as e:
        print(f"❌ Error en el motor de diagnóstico: {str(e)}")
        return jsonify({"error": f"Error al procesar el diagnóstico: {str(e)}"}), 500

    return jsonify({
        "paciente": paciente,
        "prueba": prueba,
        "enfermedad": enfermedad
    })

if __name__ == "__main__":
    debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"
    app.run(debug=debug_mode)
