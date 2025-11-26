/* ============================================================
   HERENCIA IA — PLANTID API
   Identificación de plantas por texto / imagen
   + Aliases para compatibilidad con SuperBrainIA
//    ============================================================ */

const PlantID = {

  apiKey: "",
  endpoint: "https://plant.id/api/v3/identification",

  async searchPlant(query) {
    if (!this.apiKey) {
      return { error: "PlantID API key no configurada" };
    }

    try {
      const payload = {
        query,
        language: "es",
        details: ["common_names", "wiki_description", "taxonomy"]
      };

      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": this.apiKey
        },
        body: JSON.stringify(payload)
      });

      return await res.json();
    } catch (e) {
      console.warn("PlantID error:", e);
      return { error: "No se pudo consultar PlantID" };
    }
  },

  setKey(key) {
    this.apiKey = key;
  },

  expose() {
    window.PlantID = this;
    console.log("🌿 PlantID API lista.");
  }
};

/* ------------------------------------------------------------
   ✅ ALIASES OBLIGATORIOS PARA SUPERBRAIN
   SuperBrainIA llama:
   - PlantID.identifyText()
   - PlantID.identifyImage()
   y tu API base era searchPlant()
   ------------------------------------------------------------ */

PlantID.identifyText = async function(q){
  return await this.searchPlant(q);
};

PlantID.identifyImage = async function(base64){
  // si aún no tienes endpoint real de imagen,
  // usamos el mismo motor con fallback seguro
  return await this.searchPlant(base64);
};

// Exponer
PlantID.expose();

export { PlantID };