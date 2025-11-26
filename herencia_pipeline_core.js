/* ===============================================================
   HERENCIA IA — PIPELINE CORE
   Flujo principal de entrada → razonamiento → salida
   Guiado por:
   - IMPORTANTE.txt
   - arbol_proyecto.txt
//    =============================================================== */

const HERENCIA_PIPELINE = {

    activo: false,

    async procesarEntrada(texto, opciones = {}) {

        if (!texto || typeof texto !== "string") return "";

        // ---------------------------------------------------------
        // 1) Seguridad (evita contenido prohibido)
        // ---------------------------------------------------------
        if (window.Safety && !Safety.isContentAllowed(texto)) {
            return "⚠ Lo siento, pero no puedo responder a eso.";
        }

        // ---------------------------------------------------------
        // 2) Registrar memoria corta
        // ---------------------------------------------------------
        if (window.MemoryBridge) {
            MemoryBridge.registrarEntrada("short", texto);
        }

        // ---------------------------------------------------------
        // 3) Extraer contexto
        // ---------------------------------------------------------
        let contexto = (window.MemoryBridge) ?
            MemoryBridge.obtenerContexto() :
            {};

        // ---------------------------------------------------------
        // 4) Pre-procesamiento del texto (razonamiento superficial)
        // ---------------------------------------------------------
        let analisis = texto.toLowerCase();

        // Detectar si el usuario pide diagnóstico
        const esDiagnostico = (
            analisis.includes("mancha") ||
            analisis.includes("hoja") ||
            analisis.includes("hongo") ||
            analisis.includes("plaga") ||
            analisis.includes("punto") ||
            analisis.includes("amarill")
        );

        // ---------------------------------------------------------
        // 5) Diagnóstico
        // ---------------------------------------------------------
        if (esDiagnostico && window.diagnosticoEngine) {
            try {
                const r = await diagnosticoEngine.analizarTexto(texto);
                MemoryBridge.registrarEntrada("mid", {
                    tipo: "diagnostico",
                    data: r
                });
                return r.resumen || r.texto || "Diagnóstico parcial realizado.";
            } catch (e) {
                console.error("❌ Error en diagnóstico:", e);
            }
        }

        // ---------------------------------------------------------
        // 6) Conectar con Reasoner.js (si existe)
        // ---------------------------------------------------------
        let razonamientoFinal = texto;

        if (window.reasoner && typeof reasoner.procesar === "function") {
            try {
                razonamientoFinal = await reasoner.procesar(texto, contexto);
            } catch (err) {
                console.warn("⚠ Reasoner falló, usando texto original.");
            }
        }

        // ---------------------------------------------------------
        // 7) Personalidad (HERENC(IA), la Dama Verde)
        // ---------------------------------------------------------
        let respuestaFinal = this.aplicarPersonalidad(razonamientoFinal);

        // ---------------------------------------------------------
        // 8) Registrar memoria media
        // ---------------------------------------------------------
        if (window.MemoryBridge) {
            MemoryBridge.registrarEntrada("mid", {
                tipo: "respuesta",
                data: respuestaFinal
            });
        }

        return respuestaFinal;
    },

    /* ===========================================================
       APLICAR PERSONALIDAD
       Compatible con HERENCIA_PERSONALIDADES_CORE de IMPORTANTE.txt
//        =========================================================== */
    aplicarPersonalidad(texto) {

        if (!window.HERENCIA_PERSONALIDADES_CORE) return texto;

        const tono = HERENCIA_PERSONALIDADES_CORE.central;
        const rasgos = HERENCIA_PERSONALIDADES_CORE.rasgos.join(", ");

        return `
🌿 **Herenc(IA)** — ${tono}

${texto}

---

*Rasgos activos:* ${rasgos}
        `.trim();
    },

    /* ===========================================================
       INICIAR PIPELINE
//        =========================================================== */
    iniciar() {
        console.log("🔗 HERENCIA_PIPELINE iniciado.");
        this.activo = true;
    }
};

/* Autoejecución */
window.addEventListener("DOMContentLoaded", () => {
    HERENCIA_PIPELINE.iniciar();
});