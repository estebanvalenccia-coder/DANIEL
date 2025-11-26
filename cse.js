/* ============================================================
   HERENCIA IA — CSE API
   Alias oficial de Google CSE para el SuperBrain
   Usa /api/google.js como motor real
//    ============================================================ */

import * as GoogleModule from "./google.js";

export const GoogleCSE = {
  async search(q){
    if (GoogleModule.search) return await GoogleModule.search(q);
    if (GoogleModule.googleSearch) return await GoogleModule.googleSearch(q);
    if (GoogleModule.GoogleCSE?.search) return await GoogleModule.GoogleCSE.search(q);

    throw new Error("google.js no expone search()");
  },

  async advancedSearch(q){
    if (GoogleModule.advancedSearch) return await GoogleModule.advancedSearch(q);
    if (GoogleModule.GoogleCSE?.advancedSearch) return await GoogleModule.GoogleCSE.advancedSearch(q);
    return await this.search(q);
  }
};

window.GoogleCSE = window.GoogleCSE || GoogleCSE;
console.log("🔎 cse.js listo (GoogleCSE).");