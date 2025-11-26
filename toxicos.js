/* ============================================================
   HERENCIA IA — TOXICOS API
   Detector básico de plantas tóxicas
//    ============================================================ */

export const ToxicosAPI = {

  baseToxicos: [
    "dieffenbachia",
    "pothos",
    "filodendro",
    "lirio",
    "adelfa",
    "cala",
    "ficus",
    "monstera",
    "ciclamen",
    "azalea"
  ],

  revisar(nombre=""){
    const n = nombre.toLowerCase();
    const tox = this.baseToxicos.find(x => n.includes(x));
    if(tox){
      return {
        toxico:true,
        planta: tox,
        aviso:"⚠️ Puede ser tóxica para mascotas/niños. Evita ingestión."
      };
    }
    return { toxico:false };
  }
};

window.ToxicosAPI = window.ToxicosAPI || ToxicosAPI;
console.log("☠️ toxicos.js listo (ToxicosAPI).");