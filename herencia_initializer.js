/* ===============================================================
   HERENCIA IA — INITIALIZER PRINCIPAL
   Este archivo arranca TODO el sistema.

   Reglas supremas:
   - IMPORTANTE.txt → Ley absoluta
   - arbol_proyecto.txt → Estructura oficial
   - No romper el orden del árbol ni del CORE

   Funciones:
   ✔ Cargar CORE
   ✔ Revisar archivos guía
   ✔ Preparar seguridad
   ✔ Preparar idioma
   ✔ Preparar memoria
   ✔ Preparar entorno IA
//    =============================================================== */

const HERENCIA_INIT = {
    estado: "apagado",
    reglas: {},
    arbol: {},
    idioma: "ES",
    seguridadActiva: true,
    cargado: false,

    /* --------------------------------------------------------------
       1) Cargar IMPORTANTE.txt (Ley suprema)
       -------------------------------------------------------------- */
    async cargarImportante() {
        try {
            const res = await fetch("./IMPORTANTE.txt");
            this.reglas.texto = await res.text();

            console.log("✔ IMPORTANTE.txt cargado.");
        } catch (e) {
            console.error("❌ ERROR cargando IMPORTANTE.txt", e);
        }
    },

    /* --------------------------------------------------------------
       2) Cargar árbol del proyecto (Mapa)
       -------------------------------------------------------------- */
    async cargarArbol() {
        try {
            const res = await fetch("./arbol_proyecto.txt");
            this.arbol.texto = await res.text();

            console.log("✔ arbol_proyecto.txt cargado.");
        } catch (e) {
            console.error("❌ ERROR cargando arbol_proyecto.txt", e);
        }
    },

    /* --------------------------------------------------------------
       3) Configurar seguridad absoluta del usuario
       -------------------------------------------------------------- */
    activarSeguridad() {
        this.seguridad = {
            dueño: "Daniel Esteban Valencia",
            control_total: true,
            ia_restringida: true,
            no_modificar_codigo: true,
            no_saltar_bloqueos: true
        };

        console.log("🛡 Seguridad máxima activa.");
    },

    /* --------------------------------------------------------------
       4) Preparar entorno y memoria básica
       -------------------------------------------------------------- */
    prepararEntorno() {
        this.entorno = {
            idioma: this.idioma,
            memoria: {
                short: {},
                mid: {},
                long: {},
                vector: []
            }
        };

        console.log("📦 Entorno base preparado.");
    },

    /* --------------------------------------------------------------
       5) Cargar el CORE (el cerebro completo)
       -------------------------------------------------------------- */
    async cargarCore() {
        try {
            await import("./core_loader.js");
            console.log("🧠 CORE cargado desde core_loader.js");
        } catch (e) {
            console.error("❌ Error cargando CORE", e);
        }
    },

    /* --------------------------------------------------------------
       6) Iniciar HERENC(IA)
       -------------------------------------------------------------- */
    async iniciar() {
        console.log("🌱 Iniciando HERENC(IA)…");

        this.estado = "cargando";

        await this.cargarImportante();
        await this.cargarArbol();
        this.activarSeguridad();
        this.prepararEntorno();
        await this.cargarCore();

        this.estado = "activo";
        this.cargado = true;

        console.log("🌿 HERENC(IA) ACTIVADA.");
        console.log("✨ Sistema esperando UI e index.html final.");
    }
};

/* Auto-inicio al cargar el archivo */
window.addEventListener("DOMContentLoaded", () => {
    HERENCIA_INIT.iniciar();
});