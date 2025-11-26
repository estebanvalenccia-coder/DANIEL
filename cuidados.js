/* ============================================================
   HERENCIA IA — CUIDADOS API
   Recomendaciones genéricas de cuidado
//    ============================================================ */

export const CuidadosAPI = {

  sugerir(texto=""){
    const t = texto.toLowerCase();
    const tips = [];

    if(t.includes("amarill")) tips.push("Revisa exceso de riego y drenaje.");
    if(t.includes("seca") || t.includes("crujiente")) tips.push("Puede faltar agua o humedad ambiental.");
    if(t.includes("cae hoja")) tips.push("Evita cambios bruscos de temperatura/luz.");
    if(t.includes("mancha")) tips.push("Aísla la planta y limpia hojas; revisa hongos/plagas.");
    if(t.includes("sol") || t.includes("quemad")) tips.push("Reduce sol directo, pásala a luz indirecta.");
    if(t.includes("tallo blando")) tips.push("Reduce riego y revisa raíces.");

    if(tips.length === 0) tips.push("Dime luz, riego y sustrato para afinar cuidados.");

    return tips;
  }
};

window.CuidadosAPI = window.CuidadosAPI || CuidadosAPI;
console.log("🪴 cuidados.js listo (CuidadosAPI).");