/* ============================================================
   HERENCIA IA — TREFLE API
   Botánica profunda desde Trefle
   + Alias global "Trefle.getData" para SuperBrainIA
//    ============================================================ */

const TrefleAPI = {

  token: "",
  endpoint: "https://trefle.io/api/v1/plants/search",

  setToken(t){
    this.token = t;
  },

  async search(query){
    if(!this.token){
      return { error: "Token de Trefle no configurado" };
    }

    try{
      const url = `${this.endpoint}?token=${this.token}&q=${encodeURIComponent(query)}`;
      const res = await fetch(url);
      return await res.json();
    } catch(e){
      console.warn("Trefle error:", e);
      return { error: "No se pudo consultar Trefle" };
    }
  },

  expose(){
    window.TrefleAPI = this;
    console.log("🌱 TrefleAPI lista.");
  }
};

/* ------------------------------------------------------------
   ✅ ALIAS GLOBAL ESPERADO POR SUPERBRAIN
   SuperBrainIA llama:
   - Trefle.getData(query)
   pero tu API real vive en window.TrefleAPI.search()
   ------------------------------------------------------------ */

window.Trefle = window.Trefle || {
  getData: async (q) => await TrefleAPI.search(q)
};

// Exponer
TrefleAPI.expose();

export { TrefleAPI };