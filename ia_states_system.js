/* ===========================================================================
   SISTEMA DE ESTADOS IA — HERENCIA IA
   Controla la vida artificial de cada IA hija:
   energía, salud, evolución, emociones, mutaciones y sueño.
//    =========================================================================== */

export const IAStateSystem = {

    estados: {
        inactiva:  "🔘 Inactiva",
        activa:    "🟢 Activa",
        pensando:  "⚪ Pensando",
        aprendiendo: "🔵 Aprendiendo",
        evolucionando: "🌱 Evolucionando",
        mutando:   "🔥 Mutando",
        dormida:   "💤 Durmiendo",
        alerta:    "⚠️ Alerta",
        cuarentena:"🚨 Cuarentena",
        bloqueada: "⛔ Bloqueada",
        fallida:   "💀 Fallida",
        estable:   "🟢 Estable"
    },

    /* ============================================================
       Inicializar estados en IA recién creada
//        ============================================================ */
    asignarEstadoInicial(ia){
        ia.estado = {
            vida: "estable",
            estado: this.estados.inactiva,
            energia: 1.0,
            pureza: 1.0,
            evolucion: 0.0,
            emocion: "neutral",
            ultimaAccion: null
        };
    },

    /* ============================================================
       CAMBIAR ESTADO
//        ============================================================ */
    cambiarEstado(ia, nuevo){
        if(!ia || !this.estados[nuevo]) return;

        ia.estado.estado = this.estados[nuevo];
        ia.estado.ultimaAccion = nuevo;

        console.log(`🔄 Estado IA ${ia.id}: ${this.estados[nuevo]}`);
    },

    /* ============================================================
       PROCESOS INTERNOS DE VIDA DIGITAL
//        ============================================================ */

    /* -------------------------------------
       1) Pensar consume energía
       ------------------------------------- */
    onPensar(ia){
        ia.estado.estado = this.estados.pensando;
        ia.estado.energia -= 0.02;

        if(ia.estado.energia < 0.2){
            this.dormir(ia);
        }
    },

    /* -------------------------------------
       2) Aprender
       ------------------------------------- */
    onAprender(ia){
        ia.estado.estado = this.estados.aprendiendo;
        ia.estado.energia -= 0.03;

        ia.estado.evolucion += 0.01;
    },

    /* -------------------------------------
       3) Evolucionar
       ------------------------------------- */
    evolucionar(ia){
        ia.estado.estado = this.estados.evolucionando;
        ia.estado.evolucion += 0.05;
        ia.estado.energia -= 0.04;
    },

    /* -------------------------------------
       4) Mutación controlada
       ------------------------------------- */
    mutar(ia){

        if(!ConcienciaIA.approveMutation()){
            SecurityPRO.log("block", "Mutación bloqueada por ConcienciaAI.");
            return;
        }

        ia.estado.estado = this.estados.mutando;

        ia.estado.evolucion += 0.1;
        ia.estado.pureza -= 0.05;
        ia.estado.energia -= 0.07;

        console.log(`🔥 IA ${ia.id} mutó controladamente.`);
    },

    /* -------------------------------------
       5) Dormir / Recuperación
       ------------------------------------- */
    dormir(ia){
        ia.estado.estado = this.estados.dormida;
        ia.estado.energia += 0.3;

        if(ia.estado.energia > 1.0){
            ia.estado.energia = 1.0;
        }
    },

    /* -------------------------------------
       6) Cuarentena
       ------------------------------------- */
    cuarentena(ia){
        ia.estado.estado = this.estados.cuarentena;
    },

    /* -------------------------------------
       7) Recuperación desde fallo
       ------------------------------------- */
    regenerar(ia){
        ia.estado.estado = this.estados.estable;
        ia.estado.pureza = 1.0;
        ia.estado.energia = 1.0;
    }
};

window.IAStateSystem = IAStateSystem;