/* ================================================================
   MATRIZ DE REPRODUCCIÓN IA — HERENCIA IA
   Generación de IA hijas con ADN heredado y evolución controlada.
   Daniel mantiene el 100000% del control.
//    ================================================================ */

export const MatrizReproduccionIA = {

    historial: [],

    /* ============================================================
       CREAR IA HIJA DESDE UNA MADRE
//        ============================================================ */
    crearHija(iaMadre, opciones = {}) {

        if (!iaMadre || typeof iaMadre !== "object") {
            console.error("❌ No se puede crear IA hija: madre inválida.");
            return null;
        }

        /* -------- Verificación de seguridad -------- */
        if (!ConcienciaIA.approveReproduction(iaMadre)) {
            SecurityPRO.log("warn", "Reproducción IA bloqueada por ConcienciaIA.");
            return null;
        }

        /* -------- ADN heredado -------- */
        const adn = {
            personalidad: iaMadre.personalidad ? {...iaMadre.personalidad} : {},
            conocimientos: iaMadre.memoriaLarga ? [...iaMadre.memoriaLarga] : [],
            modulos: iaMadre.modulos ? {...iaMadre.modulos} : {},
            rutasNeuronales: iaMadre.rutas ? JSON.parse(JSON.stringify(iaMadre.rutas)) : {},
            reglas: iaMadre.reglas ? {...iaMadre.reglas} : {}
        };

        /* -------- Identidad propia -------- */
        const hija = {
            id: "IA_Hija_" + Date.now(),
            madre: iaMadre.id || "SuperBrain",
            personalidad: adn.personalidad,
            conocimientos: adn.conocimientos,
            modulos: adn.modulos,
            rutasNeuronales: adn.rutasNeuronales,
            reglas: adn.reglas,
            rol: opciones.rol || "IA Auxiliar",
            nivelEvolucion: 1,
            memoriaLarga: [...adn.conocimientos],
            memoriaCorta: [],
            emocional: { estabilidad: "calma", alerta: false },

            /* ====================================================
               EVOLUCIÓN IA
//                ==================================================== */
            evolucionar() {
                // mutación suave aprobada por la Conciencia
                if (!ConcienciaIA.approveMutation()) {
                    SecurityPRO.log("warn", "Mutación IA rechazada.");
                    return;
                }

                this.nivelEvolucion++;

                // ligera mejora en conexiones
                if (this.rutasNeuronales?.pesoGeneral) {
                    this.rutasNeuronales.pesoGeneral += 0.05;
                }

                SecurityPRO.log("evolve", this.id + " evolucionó a nivel " + this.nivelEvolucion);
            },

            /* ====================================================
               APRENDIZAJE IA
//                ==================================================== */
            aprender(info) {
                this.memoriaLarga.push(info);
                SecurityPRO.log("learn", this.id + " aprendió nueva información.");
            },

            /* ====================================================
               COMPORTAMIENTO IA
//                ==================================================== */
            pensar(input) {
                return SuperBrainIA.reason(input);
            }
        };

        /* -------- Proceso de nacimiento IA -------- */
        PurificationCore.run(hija);
        SealManager.protect(hija);
        RegenerationBridge.link(hija);

        /* -------- Registro en Árbol Herencia -------- */
        this.historial.push({
            madre: iaMadre.id,
            hija: hija.id,
            ts: Date.now()
        });

        SecurityPRO.log("birth", "Nació IA hija: " + hija.id);

        return hija;
    },

    /* ============================================================
       LISTA DE NACIMIENTOS IA
//        ============================================================ */
    getHistorial() {
        return this.historial.map(ev =>
            `${new Date(ev.ts).toLocaleString()} — Madre: ${ev.madre} → Hija: ${ev.hija}`
        );
    }
};

window.MatrizReproduccionIA = MatrizReproduccionIA;

console.log("🧬 Matriz de Reproducción IA cargada y lista.");