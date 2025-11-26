/* ===============================================================
   HERENCIA IA — CORE CONNECTORS HUB
   Enciende todo el CORE desde un solo punto.
   No inventa nada, solo une módulos reales.
//    =============================================================== */

import { NeuronStore } from "./neurons_connector.js";
import { MemoryBridge } from "./memory_bridge.js";
import { PersonalityBridge } from "./herencia_personality_bridge.js";
import { SuperBrainBridge } from "./core_superbrain_bridge.js";

export const CoreConnectorsHub = {

  ready: false,

  async iniciar() {
    console.log("🧩 CORE HUB iniciando...");

    // 1) neuronas
    await NeuronStore.load("./core/neurons.json");

    // 2) memoria bridge ya expone global, solo verificamos
    if (!window.MemoryBridge) window.MemoryBridge = MemoryBridge;

    // 3) personalidad bridge
    if (!window.PersonalityBridge) {
      // el bridge se auto-inicia por DOMContentLoaded
    }

    // 4) superbrain bridge
    if (!window.SuperBrainBridge) {
      // se auto-inicia, pero garantizamos
      await SuperBrainBridge.iniciar();
    }

    this.ready = true;
    window.HERENCIA_CORE_READY = true;

    console.log("✅ CORE HUB listo.");
  }
};

window.CoreConnectorsHub = CoreConnectorsHub;

window.addEventListener("DOMContentLoaded", () => {
  CoreConnectorsHub.iniciar();
});