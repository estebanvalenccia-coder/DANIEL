/* ============================================================
   GOOGLE.JS — API Google Custom Search para HERENCIA IA
//    ============================================================ */

const GoogleCSE = {

    key: "",
    cx: "",

    async search(query){
        if(!this.key || !this.cx) return "⚠️ Google API no configurada.";

        const url = `https://www.googleapis.com/customsearch/v1?key=${this.key}&cx=${this.cx}&q=${encodeURIComponent(query)}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            return data.items || [];
        } catch(e){
            console.error("GoogleCSE Error:", e);
            return null;
        }
    },

    setKeys(key, cx){
        this.key = key;
        this.cx = cx;
    },

    expose(){
        window.GoogleCSE = this;
    }
};

GoogleCSE.expose();