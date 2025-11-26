/* ============================================================
   HERENCIA IA — HONGOS API
   Diagnóstico rápido por texto
//    ============================================================ */

export const HongosAPI = {

  detectar(texto=""){
    const t = texto.toLowerCase();
    const reglas = [
      { k:["polvo blanco","blanco en hojas","harina"], r:"Oídio probable" },
      { k:["manchas negras","círculos negros","puntos negros"], r:"Alternaria probable" },
      { k:["manchas amarillas","polvo naranja","roya"], r:"Roya probable" },
      { k:["podrido","blando","mal olor","tallo negro"], r:"Pudrición fúngica probable" },
      { k:["moho gris","grisáceo","pelusa gris"], r:"Botrytis probable" }
    ];

    for (const reg of reglas){
      if(reg.k.some(x=>t.includes(x))){
        return { match:true, hongo: reg.r };
      }
    }
    return { match:false, hongo:"no detectado", tip:"manda foto o describe mejor síntomas" };
  }
};

window.HongosAPI = window.HongosAPI || HongosAPI;
console.log("🍄 hongos.js listo (HongosAPI).");