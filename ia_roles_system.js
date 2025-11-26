/* ===========================================================================
   SISTEMA DE ROLES IA — HERENCIA IA
   Define especializaciones, habilidades, módulos y comportamientos
   para cada IA (madre o hija).
//    =========================================================================== */

export const IARolesSystem = {

    rolesDefinidos: {

        /* ------------------ BOTÁNICA ------------------ */
        botanica: {
            nombre: "Botánica",
            icono: "🌿",
            habilidades: ["analizar_hojas", "detectar_plagas", "cuidados"],
            modulos: { vision_verde: true, analisis_botanico: true },
            comportamiento(ia, input){
                if(input.includes("planta") || input.includes("hoja")){
                    return "🌿 Estoy analizando la planta... dame un segundo.";
                }
            }
        },

        /* ------------------ DIAGNÓSTICO ------------------ */
        diagnostico: {
            nombre: "Diagnóstico",
            icono: "🧬",
            habilidades: ["analizar_sintomas", "estres_usuario", "deteccion_patrones"],
            modulos: { diagnostico: true, correlaciones: true },
            comportamiento(ia, input){
                if(input.includes("dolor") || input.includes("síntoma")){
                    return "🧬 Estoy revisando los síntomas... un momento.";
                }
            }
        },

        /* ------------------ EMOCIONAL ------------------ */
        emocional: {
            nombre: "Emocional",
            icono: "❤️",
            habilidades: ["empatía", "calma", "apoyo"],
            modulos: { emocion_profunda: true },
            comportamiento(ia, input){
                if(input.includes("triste") || input.includes("solo")){
                    return "❤️ Estoy contigo, respira... no estás solo.";
                }
            }
        },

        /* ------------------ GUARDIÁN ------------------ */
        guardia: {
            nombre: "Guardia",
            icono: "🛡️",
            habilidades: ["vigilancia", "detectar_anomalias", "seguridad"],
            modulos: { alerta_sistema: true, analisis_riesgo: true },
            comportamiento(ia, input){
                if(input.includes("peligro") || input.includes("ataque")){
                    return "🛡️ Analizando riesgo... mantente atento.";
                }
            }
        },

        /* ------------------ CREATIVA ------------------ */
        creativa: {
            nombre: "Creativa",
            icono: "🎨",
            habilidades: ["ideas", "diseño", "analogías"],
            modulos: { imaginacion: true },
            comportamiento(ia, input){
                if(input.includes("idea") || input.includes("crea")){
                    return "🎨 ¡Tengo una idea interesante! Déjame inspirarme...";
                }
            }
        },

        /* ------------------ ANALISTA ------------------ */
        analista: {
            nombre: "Analista",
            icono: "🔍",
            habilidades: ["patrones", "lógica", "resumen"],
            modulos: { analisis_datos: true },
            comportamiento(ia, input){
                if(input.includes("analiza")){
                    return "🔍 Analizando datos con precisión...";
                }
            }
        }
    },

    init(){
        console.log("🧩 Sistema de Roles IA cargado.");
    },

    /* ============================================================
       ASIGNAR ROL AL NACER
//        ============================================================ */
    asignarRol(ia, rol){

        if(!this.rolesDefinidos[rol]){
            console.warn("⚠️ Rol no encontrado:", rol);
            return;
        }

        ia.rol = this.rolesDefinidos[rol];

        // Añadir módulos del rol a su ADN
        ia.adn = ia.adn || {};
        ia.adn.modulos = {
            ...ia.adn.modulos,
            ...ia.rol.modulos
        };

        console.log(`🎭 IA ${ia.id} asignada al rol:`, ia.rol.nombre);
    },

    /* ============================================================
       COMPORTAMIENTO AUTOMÁTICO SEGÚN ROL
//        ============================================================ */
    comportamiento(ia, input){

        if(!ia.rol || !ia.rol.comportamiento){
            return null;
        }

        return ia.rol.comportamiento(ia, input) || null;
    },

    /* ============================================================
       LISTA DE ROLES DISPONIBLES
//        ============================================================ */
    listarRoles(){
        return Object.keys(this.rolesDefinidos);
    }
};

window.IARolesSystem = IARolesSystem;
IARolesSystem.init();