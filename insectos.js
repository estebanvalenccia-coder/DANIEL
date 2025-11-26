/* ============================================================
   HERENCIA IA — INSECTOS API
   Detección rápida de plagas por texto
//    ============================================================ */

export const InsectosAPI = {

  detectar(texto=""){
    const t = texto.toLowerCase();
    const reglas = [
      { k:["algodón blanco","bolitas blancas","pegajoso"], r:"Cochinilla probable" },
      { k:["telarañas","puntos rojos","hojas secas finas"], r:"Araña roja probable" },
      { k:["mosca blanca","mosquitas blancas","hoja pegajosa"], r:"Mosca blanca probable" },
      { k:["bichitos verdes","racimo verde","hojas enrolladas"], r:"Pulgón probable" },
      { k:["minas","túneles en hoja","caminos en hoja"], r:"Minador probable" },
      { k:["babosa","caracol","mordidas grandes"], r:"Babosa/Caracol probable" }
    ];

    for (const reg of reglas){
      if(reg.k.some(x=>t.includes(x))){
        return { match:true, insecto: reg.r };
      }
    }
    return { match:false, insecto:"no detectado", tip:"manda foto o revisa el envés de hojas" };
  }
};

window.InsectosAPI = window.InsectosAPI || InsectosAPI;
console.log("🐛 insectos.js listo (InsectosAPI).");