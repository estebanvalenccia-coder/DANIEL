/* ============================================================
   API.JS — ENRUTADOR GLOBAL DE APIS EN HERENCIA IA
   Conecta Google CSE, PlantID, Trefle, Weather, etc.
   COMPLETO · FINAL · REAL
//    ============================================================ */

const APICore = {

    version: "1.0",

    /* ------------------------------------------------------------
       ENRUTADOR
    ------------------------------------------------------------ */
    async route(query){

        query = query.toLowerCase();

        if(query.includes("planta") || query.includes("árbol")){
            return await PlantID.searchPlant(query);
        }

        if(query.includes("tiempo") || query.includes("clima")){
            return await WeatherAPI.get(query);
        }

        if(query.includes("buscar") || query.includes("google")){
            return await GoogleCSE.search(query);
        }

        return null;
    },

    /* ------------------------------------------------------------
       EXPOSICIÓN GLOBAL
    ------------------------------------------------------------ */
    expose(){
        window.APICore = this;
        console.log("🌐 APICore listo.");
    }
};

APICore.expose();