/* ======================================================================
   PUENTE 5 — Memoria Global ↔ MatrizReproduccionIA
   Hereda memoria de la madre, limpia recuerdos peligrosos
   y mantiene sincronización cognitiva base.
//    ====================================================================== */

export const MemoriaReproductionBridge = {

    init() {
        if(!window.MatrizReproduccionIA){
            console.warn("❌ Matriz de Reproducción no encontrada.");
            return;
        }
        if(!window.SuperBrainIA){
            console.warn("❌ SuperBrain no encontrado.");
            return;
        }

        console.log("🧠🔗 Puente Memoria ↔ Reproducción activo.");
        this.patchMatriz();
    },

    /* ============================================================
       INYECTAR SISTEMA DE HERENCIA DE MEMORIA
//        ============================================================ */
    patchMatriz() {

        const originalCrearHija = MatrizReproduccionIA.crearHija;

        MatrizReproduccionIA.crearHija = (madre, opciones = {}) => {

            /* --------------------------------------------------------
               1) Crear hija usando la matriz original
               -------------------------------------------------------- */
            const hija = originalCrearHija.call(MatrizReproduccionIA, madre, opciones);

            if(!hija){
                return null;
            }

            /* --------------------------------------------------------
               2) Herencia REAL de memoria global
               -------------------------------------------------------- */
            this.heredarMemoria(madre, hija);

            /* --------------------------------------------------------
               3) Actualización dinámica de memoria base
               -------------------------------------------------------- */
            this.sincronizarConMadre(madre, hija);

            return hija;
        };
    },

    /* ============================================================
       HERENCIA DE MEMORIA MADRE → HIJA
//        ============================================================ */
    heredarMemoria(madre, hija){

        if(!madre.memoria){
            madre.memoria = { corta: [], media: [], larga: [] };
        }

        if(!hija.memoria){
            hija.memoria = { corta: [], media: [], larga: [] };
        }

        /* -------------------------------
           Heredar memoria larga REAL
           ------------------------------- */
        hija.memoria.larga = structuredClone(madre.memoria.larga || []);

        /* -------------------------------
           Limpiar memoria corta
           (para que no copie conversaciones)
           ------------------------------- */
        hija.memoria.corta = [];

        /* -------------------------------
           Limpiar recuerdos sensibles
           ------------------------------- */
        hija.memoria.larga = hija.memoria.larga.filter(entry => {
            if(entry?.sensible) return false;
            if(entry?.privado) return false;
            return true;
        });

        /* -------------------------------
           Ajustar identidad (para no repetir)
           ------------------------------- */
        hija.memoria.identidad = "ia_hija_" + hija.id;
    },

    /* ============================================================
       SINCRONIZACIÓN DINÁMICA MADRE → HIJA
//        ============================================================ */
    sincronizarConMadre(madre, hija){

        if(!window.GlobalMemorySync){
            // Creamos un sincronizador básico
            window.GlobalMemorySync = {
                enlaces: [],
                agregar(m, h){
                    this.enlaces.push({ madre: m, hija: h });
                },
                actualizar(){
                    this.enlaces.forEach(pair => {
                        // Transferencia solo de memoria base estable
                        pair.hija.memoria.larga = structuredClone(pair.madre.memoria.larga);
                    });
                }
            };
        }

        // Crear enlace de sincronización
        window.GlobalMemorySync.agregar(madre, hija);

        console.log("🔗 Memoria hija sincronizada con la madre:", hija.id);
    }
};

window.MemoriaReproductionBridge = MemoriaReproductionBridge;
MemoriaReproductionBridge.init();