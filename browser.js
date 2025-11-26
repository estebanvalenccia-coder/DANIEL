/* ============================================================
   BROWSER.JS — Navegación local simulada (sandbox) HERENCIA IA
//    ============================================================ */

const BrowserAPI = {

    open(url){
        window.open(url, "_blank");
        MemoryCore?.pushShort?.("BROWSER:" + url);
        return "Abriendo: " + url;
    },

    search(q){
        const url = "https://www.google.com/search?q=" + encodeURIComponent(q);
        window.open(url, "_blank");
        return "Buscando: " + q;
    },

    expose(){
        window.BrowserAPI = this;
    }
};

BrowserAPI.expose();