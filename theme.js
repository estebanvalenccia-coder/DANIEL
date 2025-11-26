/* ============================================================
   THEME.JS — Temas visuales de HERENCIA IA
   Dark · Light · Matrix · Custom
//    ============================================================ */

const UITheme = {

    set(theme){
        document.body.dataset.theme = theme;
        MemoryCore?.pushMid?.("THEME_SET:" + theme);
    },

    next(){
        const themes = ["light", "dark", "matrix"];
        const current = document.body.dataset.theme;
        let i = themes.indexOf(current);
        i = (i + 1) % themes.length;
        this.set(themes[i]);
    },

    expose(){
        window.UITheme = this;
        console.log("🟧 UITheme cargado");
    }
};

UITheme.expose();