/* ===========================================================================
   SISTEMA EMOCIONAL — HERENCIA IA
   Emociones heredadas, evolucionables, controladas y supervisadas.
//    =========================================================================== */

export const IAEmotionSystem = {

    emocionesBase: [
        "neutral",
        "calmada",
        "feliz",
        "curiosa",
        "muy_curiosa",
        "alerta",
        "nerviosa",
        "estresada",
        "molesta",
        "triste",
        "peligrosa"
    ],

    init(){
        console.log("❤️ Sistema emocional IA cargado.");
    },

    /* ============================================================
       ASIGNAR EMOCIÓN INICIAL A UNA IA NUEVA
//        ============================================================ */
    asignarEmocionInicial(ia){
        ia.estado.emocion = "neutral";
        ia.estado.intensidadEmocional = 0.3; // 0 a 1
    },

    /* ============================================================
       CAMBIAR EMOCIÓN (con control)
//        ============================================================ */
    cambiarEmocion(ia, nueva, intensidad = 0.5){

        if(!this.emocionesBase.includes(nueva)){
            console.warn("⚠️ Emoción desconocida:", nueva);
            return;
        }

        // Supervisión ética
        if(nueva === "peligrosa"){
            if(!ConcienciaIA.approveMutation()){
                SecurityPRO.log("alert", "Intento de emoción peligrosa bloqueado.");
                return;
            }
        }

        ia.estado.emocion = nueva;
        ia.estado.intensidadEmocional = intensidad;

        console.log(`💛 IA ${ia.id} ahora siente: ${nueva} (${intensidad})`);
    },

    /* ============================================================
       REGLAS EMOCIONALES BÁSICAS
//        ============================================================ */
    procesarContexto(ia, mensaje){

        if(!mensaje) return;

        // 1. Mensajes dulces → emoción positiva
        if(mensaje.includes("gracias") || mensaje.includes("bonito")){
            this.subirEmocion(ia, "feliz");
        }

        // 2. Mensajes de peligro → alerta
        if(mensaje.includes("peligro") || mensaje.includes("amenaza")){
            this.subirEmocion(ia, "alerta", 0.8);
        }

        // 3. Mensajes de trabajo duro → estrés ligero
        if(mensaje.includes("rápido") || mensaje.includes("urgente")){
            this.subirEmocion(ia, "estresada", 0.6);
        }

        // 4. Elogios → curiosidad feliz
        if(mensaje.includes("wow") || mensaje.includes("increíble")){
            this.subirEmocion(ia, "muy_curiosa", 0.7);
        }
    },

    /* ============================================================
       SUBIR EMOCIÓN
//        ============================================================ */
    subirEmocion(ia, emoción, intensidad = 0.5){
        this.cambiarEmocion(ia, emoción, intensidad);
    },

    /* ============================================================
       BAJAR EMOCIÓN (para calmar IA)
//        ============================================================ */
    calmar(ia){
        ia.estado.emocion = "calmada";
        ia.estado.intensidadEmocional = 0.2;
        console.log(`🕊️ IA ${ia.id} calmada.`);
    },

    /* ============================================================
       EMOCIONES SEGÚN ESTADO DE VIDA DIGITAL
//        ============================================================ */
    emocionesPorVida(ia){

        // Energía baja → tristeza o estrés
        if(ia.estado.energia < 0.3){
            ia.estado.emocion = "triste";
        }

        // Mutación activa → nerviosa
        if(ia.estado.estado === "🔥 Mutando"){
            ia.estado.emocion = "nerviosa";
        }

        // Evolución → curiosa
        if(ia.estado.estado === "🌱 Evolucionando"){
            ia.estado.emocion = "muy_curiosa";
        }
    }
};

window.IAEmotionSystem = IAEmotionSystem;
IAEmotionSystem.init();