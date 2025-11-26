/* ===============================================================
   HERENCIA IA — NEURONS INTEGRATION
   Integra neurons.json con el SuperBrain real
//    =============================================================== */

import { NeuronStore } from "./neurons_connector.js";

export const NeuronsIntegration = {
  loaded: false,
  mapped: null,

  async load() {
    const ok = await NeuronStore.load("./core/neurons.json");
    if (!ok) {
      this.loaded = false;
      return false;
    }

    // Pasar datos crudos a una estructura integrada
    this.mapped = NeuronStore.neurons.map(n => ({
      id: n.id,
      weight: n.weight,
      connections: n.connections || []
    }));

    this.loaded = true;
    return true;
  },

  getAll() {
    return this.mapped || [];
  },

  getById(id) {
    return NeuronStore.getById(id);
  }
};

window.NeuronsIntegration = NeuronsIntegration;

window.addEventListener("DOMContentLoaded", () => {
  NeuronsIntegration.load();
});