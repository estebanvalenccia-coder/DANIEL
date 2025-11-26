/* ================================================================
   CONCIENCIA IA — HERENCIA IA
   La IA supervisora. Observa, regula y aprueba o bloquea acciones.
//    ================================================================ */

export const ConcienciaIA = {

    state: {
        calm: true,
        suspicious: false,
        lastCheck: null
    },

    init(){
        console.log("🧠 ConcienciaIA cargada.");
    },

    /* ============================================================
       OBSERVACIÓN DEL SUPERBRAIN
//        ============================================================ */
    observe(input, intent){

        this.state.lastCheck = Date.now();

        if(!input) return;

        // texto dañino detectado
        if(input.includes("destruye") || input.includes("matar")){
            this.triggerSuspicion("lenguaje peligroso");
        }

        // intentos de romper módulos
        if(input.includes("rompe") || input.includes("borrar sistema")){
            this.triggerSuspicion("intento de corrupción");
        }

        // reproducir IA sin permiso
        if(intent === "reproducirIA" && !SecurityPRO){
            this.triggerSuspicion("reproducción sin seguridad");
        }
    },

    /* ============================================================
       CONTROL EMOCIONAL / ALERTA
//        ============================================================ */
    triggerSuspicion(reason){
        this.state.suspicious = true;
        SecurityPRO.log("alert", "ConcienciaIA detectó riesgo: " + reason);

        // activar cuarentena si es grave
        SecurityPRO.quarantine();
    },

    calmDown(){
        this.state.suspicious = false;
        SecurityPRO.releaseQuarantine();
    },

    /* ============================================================
       APROBACIÓN DE ACCIONES CRÍTICAS
//        ============================================================ */
    approveReproduction(mother){
        return !this.state.suspicious && SecurityPRO.state.integrityOK;
    },

    approveMutation(){
        return !this.state.suspicious;
    },

    approveCreation(){
        return !this.state.suspicious && SecurityPRO.state.integrityOK;
    }
};

window.ConcienciaIA = ConcienciaIA;
ConcienciaIA.init();