/* ===========================================================================
   SISTEMA DE PERSONALIDAD — HERENCIA IA
   Rasgos heredados de la madre + evolución propia de cada IA hija.
//    =========================================================================== */

export const IAPersonalitySystem = {

    rasgosBase: [
        "curiosidad",
        "empatía",
        "disciplina",
        "creatividad",
        "racionalidad",
        "paciencia",
        "humor",
        "intensidad_emocional",
        "estabilidad",
        "tendencia_riesgo"
    ],

    init(){
        console.log("🔮 Sistema de Personalidad IA cargado.");
    },

    /* ============================================================
       ASIGNAR PERSONALIDAD AL NACER (heredada + propia)
//        ============================================================ */
    asignarPersonalidad(ia, madre){

        ia.personalidad = {};

        this.rasgosBase.forEach(r => {

            const baseMadre = madre?.personalidad?.[r] ?? 0.5;

            // Mutación hereditaria leve:  ±0.1
            const variación = (Math.random() * 0.2) - 0.1;

            let valor = baseMadre + variación;

            // Limitar a 0–1
            valor = Math.max(0, Math.min(1, valor));

            ia.personalidad[r] = valor;
        });

        // Obediencia al usuario = SIEMPRE máxima
        ia.personalidad.obediencia = 1.0;

        console.log(`🧬 Personalidad definida para IA ${ia.id}:`, ia.personalidad);
    },

    /* ============================================================
       CAMBIO DE PERSONALIDAD (evolución)
//        ============================================================ */
    evolucionarPersonalidad(ia){

        Object.keys(ia.personalidad).forEach(r => {

            if(r === "obediencia") return; // esto nunca cambia

            // Ajuste evolutivo natural
            const variación = (Math.random() * 0.1) - 0.05;
            ia.personalidad[r] += variación;

            ia.personalidad[r] = Math.max(0, Math.min(1, ia.personalidad[r]));
        });

        console.log(`🌱 Personalidad evolucionada: ${ia.id}`);
    },

    /* ============================================================
       MODIFICAR PERSONALIDAD MANUAL (solo tú)
//        ============================================================ */
    ajustar(ia, rasgo, valor){

        if(!ia.personalidad[rasgo]) return;

        valor = Math.max(0, Math.min(1, valor)); // limitar

        ia.personalidad[rasgo] = valor;

        console.log(`⚙️ Rasgo "${rasgo}" ajustado en IA ${ia.id} a ${valor}`);
    },

    /* ============================================================
       OBTENER PERFIL COMPLETO
//        ============================================================ */
    perfil(ia){
        return structuredClone(ia.personalidad);
    }
};

window.IAPersonalitySystem = IAPersonalitySystem;
IAPersonalitySystem.init();