/* ===============================================================
   HERENCIA IA — CORE SUPERBRAIN BRIDGE (AJUSTADO)
   Puente maestro del cerebro distribuido.
   Usa conectores reales del CORE:
   - neurons_connector.js  -> NeuronStore
   - memory_bridge.js      -> MemoryBridge
   - herencia_personality_bridge.js -> PersonalityBridge
//    =============================================================== */

import { NeuronStore } from "./neurons_connector.js";
import { MemoryBridge } from "./memory_bridge.js";
import { PersonalityBridge } from "./herencia_personality_bridge.js";

export const SuperBrainBridge = {

    cargado: false,
    iaList: [],
    reasoner: null,
    ethics: null,

    /* -----------------------------------------------------------
       1) Cargar neuronas desde NeuronStore
       ----------------------------------------------------------- */
    async cargarNeuronas() {
        const ok = await NeuronStore.load("./core/neurons.json");
        if (!ok) {
            console.warn("⚠ NeuronStore no pudo cargar neurons.json.");
        }
    },

    /* -----------------------------------------------------------
       2) Garantizar lista de 3000 IAs
       ----------------------------------------------------------- */
    asegurarLista3000() {
        if (window.SUPER_IA_LIST && Array.isArray(window.SUPER_IA_LIST)) {
            this.iaList = window.SUPER_IA_LIST;
        } else if (NeuronStore.loaded && NeuronStore.neurons.length >= 3000) {
            this.iaList = NeuronStore.neurons.map(n => n.id);
            window.SUPER_IA_LIST = this.iaList;
        } else {
            this.iaList = Array.from({ length: 3000 }, (_, i) => `IA_${i + 1}`);
            window.SUPER_IA_LIST = this.iaList;
        }
        console.log("🌿 SuperBrain IAList:", this.iaList.length);
    },

    /* -----------------------------------------------------------
       3) Conectar módulos existentes en tu CORE
       ----------------------------------------------------------- */
    conectarModulos() {
        this.reasoner = window.reasoner || null;
        this.ethics = window.ethics || window.Safety || window.SecurityPRO || null;
    },

    /* -----------------------------------------------------------
       4) Pensamiento central (con ética + emoción + memoria)
       ----------------------------------------------------------- */
    async pensar(mensaje, contexto = {}) {

        // Ética / seguridad
        if (this.ethics?.isContentAllowed && !this.ethics.isContentAllowed(mensaje)) {
            return "⚠ No puedo procesar ese contenido.";
        }

        // Personalidad y emoción (si existen)
        PersonalityBridge?.procesarEmocion?.(mensaje);
        PersonalityBridge?.evolucionar?.();

        // Reasoner real
        if (this.reasoner?.procesar) {
            try {
                return await this.reasoner.procesar(mensaje, contexto);
            } catch (e) {
                console.warn("⚠ Reasoner falló, fallback simple.", e);
            }
        }

        return mensaje;
    },

    /* -----------------------------------------------------------
       5) Exponer SuperBrain global
       ----------------------------------------------------------- */
    exponer() {
        const self = this;

        window.SuperBrain = {
            ready: () => self.cargado,

            neurons: () => NeuronStore.neurons,
            iaList: () => self.iaList,

            getNeuron(id) {
                return NeuronStore.getById(id);
            },

            async process(texto) {
                const ctx = MemoryBridge?.obtenerContexto?.() || {};
                const base = await self.pensar(texto, ctx);

                // Guardar salida en memoria
                MemoryBridge?.registrarEntrada?.("mid", {
                    tipo: "superbrain_output",
                    data: base
                });

                // Enriquecer estilo final con personalidad
                return PersonalityBridge?.enriquecerRespuesta
                    ? PersonalityBridge.enriquecerRespuesta(base)
                    : base;
            }
        };

        console.log("🔗 SuperBrain expuesto correctamente.");
    },

    async iniciar() {
        console.log("🌱 Iniciando SuperBrainBridge (ajustado)…");

        await this.cargarNeuronas();
        this.asegurarLista3000();
        this.conectarModulos();
        this.exponer();

        this.cargado = true;
        console.log("✅ SuperBrainBridge activo.");
    }
};

window.addEventListener("DOMContentLoaded", () => {
    SuperBrainBridge.iniciar();
});

window.SuperBrainBridge = SuperBrainBridge;