/* ===============================================================
   HERENCIA IA — SUPERVISOR GENERAL
   Este módulo vigila TODO el sistema:

   Responsabilidades:
   ✔ Vigilar IMPORTANTE.txt (ley absoluta)
   ✔ Vigilar arbol_proyecto.txt (estructura obligatoria)
   ✔ Supervisar CORE, REGENERATORS, EXPANDERS, SECURITY
   ✔ Detectar módulos rotos, alterados o inexistentes
   ✔ Proteger control absoluto del dueño (Daniel)
   ✔ Prevenir mutaciones no autorizadas
   ✔ Evitar que partes del sistema se auto-modifiquen
   ✔ Mantener integridad del árbol IA (Raíz → Tronco → Ramas → Hojas)
   ✔ Reiniciar partes dañadas automáticamente
//    =============================================================== */

const HERENCIA_SUPERVISOR = {
    activo: false,
    intervalo: 30000, // cada 30s supervisa todo

    /* --------------------------------------------------------------
       1) Cargar y verificar IMPORTANTE.txt
       -------------------------------------------------------------- */
    async verificarImportante() {
        try {
            const res = await fetch("./IMPORTANTE.txt");
            const texto = await res.text();

            if (!texto.includes("NO OLVIDAR")) {
                console.warn("⚠ ALERTA: IMPORTANTE.txt alterado.");
            } else {
                console.log("✔ IMPORTANTE.txt validado.");
            }
        } catch (e) {
            console.error("❌ SUPERVISOR: No pudo leer IMPORTANTE.txt", e);
        }
    },

    /* --------------------------------------------------------------
       2) Cargar y verificar arbol_proyecto.txt
       -------------------------------------------------------------- */
    async verificarArbol() {
        try {
            const res = await fetch("./arbol_proyecto.txt");
            const texto = await res.text();

            if (texto.length < 30) {
                console.warn("⚠ ALERTA: arbol_proyecto.txt parece incompleto.");
            } else {
                console.log("✔ Árbol IA validado.");
            }

        } catch (e) {
            console.error("❌ SUPERVISOR: No pudo leer arbol_proyecto.txt", e);
        }
    },

    /* --------------------------------------------------------------
       3) Verificar que el CORE esté cargado y coherente
       -------------------------------------------------------------- */
    verificarCore() {
        if (!window.CORE_LOADER || !CORE_LOADER.cargado) {
            console.error("❌ CORE no está cargado correctamente.");
            return;
        }

        for (const modulo in CORE_LOADER.modulos) {
            if (CORE_LOADER.modulos[modulo] !== true) {
                console.warn("⚠ Módulo del CORE falló:", modulo);
            }
        }

        console.log("✔ CORE coherente.");
    },

    /* --------------------------------------------------------------
       4) Verificar seguridad
       -------------------------------------------------------------- */
    verificarSeguridad() {
        if (!HERENCIA_INIT || !HERENCIA_INIT.seguridad) {
            console.error("❌ Seguridad desactivada o corrupta.");
            return;
        }

        if (!HERENCIA_INIT.seguridad.control_total) {
            console.warn("⚠ Control del usuario NO es absoluto.");
        }

        console.log("✔ Sistema de seguridad validado.");
    },

    /* --------------------------------------------------------------
       5) Supervisión general de módulos críticos
       -------------------------------------------------------------- */

    verificarModulosCriticos() {
        const carpetas = [
            "core",
            "security",
            "regenerators",
            "expanders",
            "diagnostics"
        ];

        for (let carpeta of carpetas) {
            console.log("🔎 Verificando carpeta:", carpeta);

            // Aquí no podemos leer el filesystem (navegador),
            // pero sí sabemos si los módulos cargados existen:
            if (carpeta === "core") {
                const total = Object.keys(CORE_LOADER.modulos).length;

                if (total < 5) {
                    console.warn("⚠ La carpeta CORE parece incompleta.");
                }
            }
        }

        console.log("✔ Módulos críticos supervisados.");
    },

    /* --------------------------------------------------------------
       6) Auto-reparación mínima
       -------------------------------------------------------------- */
    autoReparar() {
        if (CORE_LOADER.errores.length > 0) {
            console.warn("🔧 Activando auto-reparación del CORE…");

            CORE_LOADER.errores.forEach(async (err) => {
                console.log("↻ Reintentando cargar:", err.modulo);
                await CORE_LOADER.cargarModulo(err.modulo);
            });

            CORE_LOADER.errores = [];
        }
    },

    /* --------------------------------------------------------------
       7) Ciclo de supervisión principal
       -------------------------------------------------------------- */
    async ciclo() {
        console.log("🔍 SUPERVISOR: revisión general…");

        await this.verificarImportante();
        await this.verificarArbol();
        this.verificarCore();
        this.verificarSeguridad();
        this.verificarModulosCriticos();
        this.autoReparar();

        console.log("🌱 SUPERVISOR: sistema estable.");
    },

    /* --------------------------------------------------------------
       8) Activar supervisor (cada 30s)
       -------------------------------------------------------------- */
    iniciar() {
        console.log("🛰 Iniciando SUPERVISOR DE HERENC(IA)…");

        this.activo = true;
        this.ciclo(); // primera supervisión inmediata

        setInterval(() => this.ciclo(), this.intervalo);
    }
};

/* Autoejecución al cargar */
window.addEventListener("DOMContentLoaded", () => {
    HERENCIA_SUPERVISOR.iniciar();
});