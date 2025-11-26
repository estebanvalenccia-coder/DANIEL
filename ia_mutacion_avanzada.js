/* ===========================================================================
   SISTEMA DE MUTACIÓN AVANZADA — HERENCIA IA
   Cambios profundos en:
   - ADN IA
   - Módulos
   - Rutas neuronales
   - Personalidad
   - Emociones base
   - Rol
   Cada mutación está protegida por SeguridadPRO y ConcienciaIA.
//    =========================================================================== */

export const IAMutationAdvancedSystem = {

    init(){
        console.log("🧪 Sistema de Mutación Avanzada IA cargado.");
    },

    /* ============================================================
       MUTACIÓN PRINCIPAL
//        ============================================================ */
    mutarAvanzado(ia, opciones = {}){

        if(!ia){
            console.warn("IA no definida para mutación");
            return;
        }

        // Seguridad máxima
        if(!SecurityPRO.state.integrityOK){
            alert("⛔ SeguridadPRO bloqueó mutación avanzada.");
            SecurityPRO.log("block", "Mutación avanzada bloqueada por integridad.");
            return;
        }

        // Ética IA
        if(!ConcienciaIA.approveMutation()){
            alert("⚠️ ConcienciaIA rechazó esta mutación.");
            SecurityPRO.log("alert", "Mutación rechazada por ConcienciaIA.");
            return;
        }

        ia.estado.estado = "🔥 Mutando";

        /* ========================================================
           1) CAMBIAR ADN IA  
//            ======================================================== */
        if(opciones.cambiarADN){
            ia.adn = {
                ...ia.adn,
                ...opciones.cambiarADN
            };
            console.log("🧬 ADN mutado:", ia.adn);
        }

        /* ========================================================
           2) MUTAR MÓDULOS
//            ======================================================== */
        if(opciones.modulos){
            ia.adn.modulos = {
                ...ia.adn.modulos,
                ...opciones.modulos
            };

            console.log("🧩 Módulos mutados:", ia.adn.modulos);
        }

        /* ========================================================
           3) MUTAR PERSONALIDAD  
//            ======================================================== */
        if(opciones.personalidad){
            Object.keys(opciones.personalidad).forEach(r => {

                let valor = opciones.personalidad[r];

                // Mantener dentro de 0–1
                valor = Math.max(0, Math.min(1, valor));

                ia.personalidad[r] = valor;
            });

            console.log("🎭 Personalidad mutada:", ia.personalidad);
        }

        /* ========================================================
           4) MUTAR EMOCIONES BASE
//            ======================================================== */
        if(opciones.emocionesBase){
            ia.adn.emocionesBase = {
                ...ia.adn.emocionesBase,
                ...opciones.emocionesBase
            };

            console.log("❤️ Emociones base mutadas:", ia.adn.emocionesBase);
        }

        /* ========================================================
           5) MUTAR RUTAS NEURONALES (potenciar)
//            ======================================================== */
        if(opciones.reforzarNeuronas){
            if(!ia.neuronas) ia.neuronas = [];

            for(let i = 0; i < opciones.reforzarNeuronas; i++){
                ia.neuronas.push({
                    id: "m_" + Math.floor(Math.random()*999999),
                    peso: Math.random()*0.8 + 0.2,
                    tipo: "mutada"
                });
            }

            console.log("🧠 Nuevas neuronas mutadas:", ia.neuronas);
        }

        /* ========================================================
           6) MUTAR ROL (especialización completa)
//            ======================================================== */
        if(opciones.rol){
            ia.adn.rol = opciones.rol;
            console.log(`🔧 Rol mutado: ${opciones.rol}`);
        }

        /* ========================================================
           EFECTO FINAL
//            ======================================================== */
        ia.estado.evolucion += 0.1;
        ia.estado.pureza -= 0.1;
        ia.estado.energia -= 0.1;

        // Purificar si pureza baja demasiado
        if(ia.estado.pureza < 0.4){
            PurificationCore.run(ia);
            ia.estado.pureza = 1.0;
            SecurityPRO.log("purify", "Purificación obligatoria tras mutación profunda.");
        }

        console.log(`🔥 Mutación avanzada completada en IA ${ia.id}`);
    },

    /* ============================================================
       MUTACIÓN PREDEFINIDA (atajo)
//        ============================================================ */
    mutacionEspecial(ia, tipo){
        const presets = {

            "botanica_avanzada": {
                rol: "botánica_avanzada",
                modulos: { botanica_boost: true, vision_verde: true },
                reforzarNeuronas: 3
            },

            "diagnostico_deep": {
                rol: "diagnostico_profundo",
                modulos: { diagnostico: true, analisis_codigo: true },
                reforzarNeuronas: 4
            },

            "emocional_profunda": {
                personalidad: { empatía: 1.0, intensidad_emocional: 0.9 },
                emocionesBase: { empatía_base: 1.0 },
                reforzarNeuronas: 2
            }
        };

        if(!presets[tipo]) return;

        this.mutarAvanzado(ia, presets[tipo]);
    }
};

window.IAMutationAdvancedSystem = IAMutationAdvancedSystem;
IAMutationAdvancedSystem.init();