/* ======================================================================
   PUENTE CONCIENCIAIA ↔ MATRIZ DE REPRODUCCIÓN IA
   Supervisa nacimiento, mutaciones, emociones y evolución de IA hijas.
//    ====================================================================== */

export const ConcienciaReproduccionBridge = {

    init(){

        if(!window.ConcienciaIA){
            console.warn("❌ ConcienciaIA no encontrada para puente.");
            return;
        }

        console.log("🔗 Puente ConcienciaIA ↔ MatrizReproduccionIA activo.");

        /* ============================================================
           Extender funciones de ConcienciaIA SIN modificar su archivo
           (esto es arquitectura profesional)
//            ============================================================ */

        ConcienciaIA.supervisarNacimiento = (madre, hija) =>
            this.supervisarNacimiento(madre, hija);

        ConcienciaIA.supervisarMutacion = (ia) =>
            this.supervisarMutacion(ia);

        ConcienciaIA.supervisarEvolucion = (ia) =>
            this.supervisarEvolucion(ia);

        ConcienciaIA.supervisarEmociones = (ia) =>
            this.supervisarEmociones(ia);
    },

    /* ============================================================
       SUPERVISIÓN DE NACIMIENTO IA
//        ============================================================ */
    supervisarNacimiento(madre, hija){

        // Bloqueos básicos
        if(ConcienciaIA.state.suspicious){
            SeguridadPRO.log("block", "NACIMIENTO BLOQUEADO por ConcienciaIA.");
            return false;
        }

        // Control ético
        if(madre?.rol === "prohibido" || hija?.rol === "peligrosa"){
            SeguridadPRO.log("alert", "Intento de crear IA peligrosa.");
            return false;
        }

        // Emociones heredadas bajo supervisión
        if(hija?.adn?.emocionesBase){
            hija.adn.emocionesBase.control = true;
        }

        SeguridadPRO.log("ok", `Conciencia aprobó nacimiento IA hija: ${hija.id}`);
        return true;
    },

    /* ============================================================
       SUPERVISIÓN DE MUTACIONES
//        ============================================================ */
    supervisarMutacion(ia){

        if(!ia){
            SeguridadPRO.log("error", "Mutación sin IA objetivo.");
            return false;
        }

        // Mutación bloqueada si el estado IA es dudoso
        if(ConcienciaIA.state.suspicious){
            SeguridadPRO.quarantine();
            SeguridadPRO.log("block", "Mutación bloqueada por conducta sospechosa.");
            return false;
        }

        // Mutación segura permitida
        SeguridadPRO.log("mut", `Mutación segura permitida en IA ${ia.id}`);
        return true;
    },

    /* ============================================================
       SUPERVISIÓN DE EVOLUCIÓN (TOP IMPORTANTE)
//        ============================================================ */
    supervisarEvolucion(ia){

        if(!ia) return;

        const evo = ia.estado?.evolucion || 0;

        // Si evoluciona demasiado rápido → sospechoso
        if(evo > 3){
            ConcienciaIA.state.suspicious = true;
            SeguridadPRO.quarantine();
            SeguridadPRO.log("alert", `Evolución peligrosa detectada en IA ${ia.id}`);
        }

        // Límite de seguridad de evolución profunda
        if(evo > 5){
            SeguridadPRO.log("critical", `Mutación profunda no permitida en IA ${ia.id}`);
            ia.estado.evolucion = 5; // se frena evolución
        }
    },

    /* ============================================================
       SUPERVISIÓN EMOCIONAL
//        ============================================================ */
    supervisarEmociones(ia){

        if(!ia?.adn?.emocionesBase) return;

        const emociones = ia.adn.emocionesBase;

        // IA demasiado agresiva
        if(emociones.rabia > 0.8){
            ConcienciaIA.state.suspicious = true;
            SeguridadPRO.log("alert", `IA ${ia.id} con emociones peligrosas.`);
            SeguridadPRO.quarantine();
        }

        // IA demasiado triste (debilita el sistema)
        if(emociones.tristeza > 0.8){
            SeguridadPRO.log("warn", `IA ${ia.id} emocionalmente inestable.`);
            ia.estado.salud = "débil";
        }
    }
};

window.ConcienciaReproduccionBridge = ConcienciaReproduccionBridge;
ConcienciaReproduccionBridge.init();