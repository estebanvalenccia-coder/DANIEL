/* ===============================================================
   HERENCIA IA — NEURONS CONNECTOR
   Conector oficial para /core/neurons.json
   Respeta:
   - IMPORTANTE.txt
   - arbol_proyecto.txt
//    =============================================================== */

export const NeuronStore = {
  loaded: false,
  schema: null,
  neurons: [],
  indexById: new Map(),

  async load(url = "./core/neurons.json") {
    try {
      const res = await fetch(url);
      const data = await res.json();

      this.schema = data.schema || null;
      this.neurons = data.neurons || [];
      this.indexById = new Map(this.neurons.map(n => [n.id, n]));

      this.loaded = true;
      console.log(`🧠 NeuronStore: ${this.neurons.length} neuronas cargadas.`);
      return true;
    } catch (e) {
      console.error("❌ NeuronStore: error cargando neurons.json", e);
      this.loaded = false;
      return false;
    }
  },

  getAll() {
    return this.neurons;
  },

  getById(id) {
    return this.indexById.get(id) || null;
  },

  // conectar dos neuronas (bidireccional)
  connect(aId, bId, w = 0.5) {
    const a = this.getById(aId);
    const b = this.getById(bId);
    if (!a || !b) return false;

    a.connections.push({ to: bId, weight: w });
    b.connections.push({ to: aId, weight: w });

    return true;
  },

  // conectar en una sola dirección
  connectOneWay(fromId, toId, w = 0.5) {
    const from = this.getById(fromId);
    const to = this.getById(toId);
    if (!from || !to) return false;

    from.connections.push({ to: toId, weight: w });
    return true;
  }
};

// Exponer global para todo el CORE
window.NeuronStore = NeuronStore;

// Auto-load cuando cargue el core
window.addEventListener("DOMContentLoaded", () => {
  NeuronStore.load();
});