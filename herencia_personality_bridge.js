/* ===============================================================
   HERENCIA IA — PERSONALITY BRIDGE
   Conecta:
   - IAPersonalitySystem
   - IAEmotionSystem
   - HERENCIA_PIPELINE
   - MemoryBridge
   - SUPERBRAIN (cuando esté activo)
//    =============================================================== */

export const PersonalityBridge = {

    /* -----------------------------------------------------------
       1) Crear estructura interna para la IA central
       ----------------------------------------------------------- */
    crearIA() {
        const ia = {
            id: "HERENCIA_CORE",
            estado: {
                emocion: "neutral",
                intensidadEmocional: 0.3,
                energia: 1.0,
                estado: "🌼 Activa"
            },
            personalidad: {}
        };

        // Inicializar módulos
        if (window.IAPersonalitySystem) {
            IAPersonalitySystem.asignarPersonalidad(ia, null);
        }

        if (window.IAEmotionSystem) {
            IAEmotionSystem.asignarEmocionInicial(ia);
        }

        this.IA = ia;
        console.log("🌿 IA CENTRAL creada:", ia);

        return ia;
    },

    /* -----------------------------------------------------------
       2) Procesar emociones según contexto
       ----------------------------------------------------------- */
    procesarEmocion(mensaje) {
        if (!this.IA) return;

        if (window.IAEmotionSystem) {
            IAEmotionSystem.procesarContexto(this.IA, mensaje);
        }
    },

    /* -----------------------------------------------------------
       3) Ajustar personalidad según evolución
       ----------------------------------------------------------- */
    evolucionar() {
        if (!this.IA) return;

        if (window.IAPersonalitySystem) {
            IAPersonalitySystem.evolucionarPersonalidad(this.IA);
        }
    },

    /* -----------------------------------------------------------
       4) Obtener tono combinado
       ----------------------------------------------------------- */
    getTono() {
        if (!this.IA) return "";

        const em = this.IA.estado.emocion;
        const intensidad = this.IA.estado.intensidadEmocional;

        let nota = "";

        switch (em) {
            case "feliz": nota = "💚 (feliz)"; break;
            case "muy_curiosa": nota = "✨ (muy curiosa)"; break;
            case "curiosa": nota = "🌱 (curiosa)"; break;
            case "calmada": nota = "🕊 (calmada)"; break;
            case "alerta": nota = "⚠️ (alerta)"; break;
            case "estresada": nota = "😥 (estresada)"; break;
            case "nerviosa": nota = "😟 (nerviosa)"; break;
            case "triste": nota = "🥀 (triste)"; break;
            default: nota = "";
        }

        return `${nota} Intensidad: ${Math.round(intensidad * 100)}%`;
    },

    /* -----------------------------------------------------------
       5) Enriquecer la respuesta final del pipeline
       ----------------------------------------------------------- */
    enriquecerRespuesta(texto) {
        if (!this.IA) return texto;

        const tono = this.getTono();
        const personalidad = JSON.stringify(this.IA.personalidad, null, 2);

        return `
${texto}

---

🌿 **Herenc(IA) — La Dama Verde**
${tono}

🧬 *Personalidad activa:*  
${personalidad}
        `.trim();
    },

    /* -----------------------------------------------------------
       6) Inicializar puente
       ----------------------------------------------------------- */
    iniciar() {
        console.log("💚 PersonalityBridge INICIADO");

        this.crearIA();

        // Integrar pipeline si existe
        if (window.HERENCIA_PIPELINE) {
            const originalProcesar = HERENCIA_PIPELINE.procesarEntrada.bind(HERENCIA_PIPELINE);

            HERENCIA_PIPELINE.procesarEntrada = async (texto, opciones) => {
                // emociones
                this.procesarEmocion(texto);

                // evolución periódica
                this.evolucionar();

                // pipeline original
                let base = await originalProcesar(texto, opciones);

                // enriquecer con personalidad
                return this.enriquecerRespuesta(base);
            };
        }
    }
};

// AUTO-EJECUCIÓN
window.addEventListener("DOMContentLoaded", () => {
    PersonalityBridge.iniciar();
});
