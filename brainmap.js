/* ============================================================
   BRAINMAP.JS — MAPA COGNITIVO DE HERENCIA IA
   Visualiza conexiones neuronales
   COMPLETO · FINAL
//    ============================================================ */

const BrainMapCore = {

    version: "1.0",

    generate(){

        const map = SuperBrainIA.neurons.map(n => {
            return {
                id: n.id,
                weight: n.weight,
                links: n.links.length
            };
        });

        MemoryCore.pushDeep("BRAINMAP:" + map.length);

        return map;
    },

    last(){
        return MemoryCore.data.deep
            .filter(d => d.content.startsWith("BRAINMAP"))
            .slice(-1)[0];
    },

    expose(){
        window.BrainMapCore = this;
    }
};

BrainMapCore.expose();