/* ===============================================================
   HERENCIA IA — MEMORY BRIDGE
   Conexión directa entre SuperBrain y MemoryCore
   --------------------------------------------------------------- */

export const MemoryBridge = {

    registrarEntrada(tipo, contenido) {

        if (!window.MemoryCore) {
            console.error("❌ MemoryCore no está disponible.");
            return;
        }

        switch (tipo) {
            case "short":
                MemoryCore.pushShort(contenido);
                break;

            case "mid":
                MemoryCore.pushMid(contenido);
                break;

            case "long":
                MemoryCore.pushLong(contenido);
                break;

            case "deep":
                MemoryCore.pushDeep(contenido);
                break;

            default:
                console.warn("⚠ Tipo de memoria no reconocido:", tipo);
        }
    },

    obtenerContexto() {
        if (!window.MemoryCore) return null;

        return MemoryCore.getContext();
    },

    buscar(query) {
        if (!window.MemoryCore) return [];

        return MemoryCore.search(query);
    },

    purgar() {
        if (!window.MemoryCore) return;

        MemoryCore.purge();
    }
};

// Exponer puente
window.MemoryBridge = MemoryBridge;

console.log("🔗 MemoryBridge conectado a MemoryCore.");