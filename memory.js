/* ============================================================
   MEMORY.JS — SISTEMA DE MEMORIA DE HERENCIA IA
   COMPLETO · FINAL · OPTIMIZADO
//    ============================================================ */

const MemoryCore = {

    version: "1.0",

    /* ------------------------------------------------------------
       ESTRUCTURA BASE
    ------------------------------------------------------------ */
    data: {
        short: [],     // memoria inmediata (últimos mensajes)
        mid: [],       // memoria media (contexto)
        long: [],      // memoria profunda
        deep: []       // memoria investigativa
    },

    limits: {
        short: 30,
        mid: 150,
        long: 2000
    },

    /* ------------------------------------------------------------
       INICIALIZACIÓN
    ------------------------------------------------------------ */
    init(){
        const saved = localStorage.getItem("HERENCIA_MEMORY_DATA");

        if(saved){
            try{
                this.data = JSON.parse(saved);
                console.log("📚 MemoryCore: memoria cargada.");
            } catch(e){
                console.warn("⚠ Error cargando memoria:", e);
            }
        } else {
            console.log("📁 MemoryCore: memoria iniciada en blanco.");
        }
    },

    /* ------------------------------------------------------------
       GUARDAR MEMORIA
    ------------------------------------------------------------ */
    save(){
        localStorage.setItem("HERENCIA_MEMORY_DATA", JSON.stringify(this.data));
    },

    /* ------------------------------------------------------------
       INSERTAR EN SHORT
    ------------------------------------------------------------ */
    pushShort(entry){
        this.data.short.push({
            value: entry,
            ts: Date.now()
        });

        if(this.data.short.length > this.limits.short){
            this.data.short.shift();
        }

        this.save();
    },

    /* ------------------------------------------------------------
       INSERTAR EN MID
    ------------------------------------------------------------ */
    pushMid(entry){
        this.data.mid.push({
            value: entry,
            ts: Date.now()
        });

        if(this.data.mid.length > this.limits.mid){
            this.data.mid.shift();
        }

        this.save();
    },

    /* ------------------------------------------------------------
       INSERTAR EN LONG
    ------------------------------------------------------------ */
    pushLong(entry){
        this.data.long.push({
            value: entry,
            ts: Date.now(),
            id: "L" + Math.random().toString(36).slice(2)
        });

        if(this.data.long.length > this.limits.long){
            this.data.long.splice(0, 1);
        }

        this.save();
    },

    /* ------------------------------------------------------------
       INSERTAR EN DEEP
    ------------------------------------------------------------ */
    pushDeep(entry){
        this.data.deep.push({
            fingerprint: btoa(entry).slice(0,12),
            content: entry,
            ts: Date.now()
        });

        this.save();
    },

    /* ------------------------------------------------------------
       BÚSQUEDA GENERAL
    ------------------------------------------------------------ */
    search(query){
        const q = query.toLowerCase();
        const all = [...this.data.short, ...this.data.mid, ...this.data.long, ...this.data.deep];

        return all.filter(entry =>
            JSON.stringify(entry).toLowerCase().includes(q)
        );
    },

    /* ------------------------------------------------------------
       OBTENER UN CONTEXTO COMPLETO
    ------------------------------------------------------------ */
    getContext(){
        return {
            short: this.data.short.slice(-10),
            mid: this.data.mid.slice(-20),
            long: this.data.long.slice(-50),
            deepCount: this.data.deep.length
        };
    },

    /* ------------------------------------------------------------
       LIMPIEZA AUTOMÁTICA
    ------------------------------------------------------------ */
    clean(){
        this.data.short = this.data.short.filter(e => e && e.value);
        this.data.mid   = this.data.mid.filter(e => e && e.value);
        this.data.long  = this.data.long.filter(e => e && e.value);
        this.data.deep  = this.data.deep.filter(e => e && e.content);

        this.save();
    },

    /* ------------------------------------------------------------
       PURGA TOTAL
    ------------------------------------------------------------ */
    purge(){
        this.data = {
            short: [],
            mid: [],
            long: [],
            deep: []
        };
        this.save();
        console.log("🧹 MemoryCore: PURGA COMPLETA.");
    },

    /* ------------------------------------------------------------
       EXPOSICIÓN GLOBAL
    ------------------------------------------------------------ */
    expose(){
        window.MemoryCore = this;
        console.log("🔗 MemoryCore expuesto a Herenc(IA).");
    }
};

/* ------------------------------------------------------------
   AUTO-EJECUCIÓN
------------------------------------------------------------ */
MemoryCore.init();
MemoryCore.expose();