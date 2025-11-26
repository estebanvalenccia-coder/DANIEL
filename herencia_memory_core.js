/* ===============================================================
   HERENCIA IA — MEMORY CORE (SUPERVISIÓN GENERAL)
   Regido por:
   - IMPORTANTE.txt (Ley absoluta)
   - arbol_proyecto.txt (Estructura oficial)
   --------------------------------------------------------------- */

const HERENCIA_MEMORY_CORE = {

    estado: "inactivo",
    ciclos: 0,

    async verificarReglas() {
        try {
            const importante = await (await fetch("./IMPORTANTE.txt")).text();
            const arbol = await (await fetch("./arbol_proyecto.txt")).text();

            if (!importante.includes("NO OLVIDAR")) {
                console.warn("⚠ IMPORTANTE.txt podría haber sido alterado.");
            }
            if (arbol.length < 30) {
                console.warn("⚠ arbol_proyecto.txt parece incompleto.");
            }

        } catch (e) {
            console.error("❌ Error verificando reglas maestras:", e);
        }
    },

    cicloBasico() {
        this.ciclos++;

        // Mantener memoria limpia
        if (window.MemoryCore && this.ciclos % 5 === 0) {
            MemoryCore.clean();
        }

        // Refrescar estado
        if (this.ciclos % 10 === 0) {
            console.log("🧠 HERENCIA MEMORY CORE: ciclo", this.ciclos);
        }
    },

    iniciar() {
        console.log("🌿 Iniciando HERENCIA_MEMORY_CORE…");

        this.estado = "activo";

        // Supervisión cada 30s
        setInterval(() => {
            this.verificarReglas();
            this.cicloBasico();
        }, 30000);
    }
};

window.addEventListener("DOMContentLoaded", () => {
    HERENCIA_MEMORY_CORE.iniciar();
});