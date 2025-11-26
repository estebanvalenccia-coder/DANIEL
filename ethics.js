/* ============================================================
   HERENC(IA) — ethics.js (wrapper del árbol)
   Árbol exige: /core/ethics.js
   Usa el supervisor ético real dentro de SuperBrainIA.
//    ============================================================ */

export const Ethics = {
  scan(text){
    if(window.SuperBrainIA?.ethics?.scan){
      return window.SuperBrainIA.ethics.scan(text);
    }
    // fallback mínimo
    const bad = ["matar","dañar","ilegal","suicidio","violencia"];
    const lower = (text||"").toLowerCase();
    const alert = bad.some(w=>lower.includes(w));
    return { safe: !alert, alert };
  },

  correct(text){
    if(window.SuperBrainIA?.ethics?.correct){
      return window.SuperBrainIA.ethics.correct(text);
    }
    return (text||"")
      .replace(/matar/gi,"neutralizar")
      .replace(/suicidio/gi,"auto-daño")
      .replace(/violencia/gi,"conflicto");
  }
};

window.Ethics = window.Ethics || Ethics;
console.log("🛡 ethics.js wrapper listo.");