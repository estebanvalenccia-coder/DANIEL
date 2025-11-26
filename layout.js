/* ============================================================
   LAYOUT.JS — Control de distribución de la interfaz
   Maneja modos visuales, tamaños y organización del panel
//    ============================================================ */

const UILayout = {

    set(mode){
        document.body.dataset.layout = mode;
        MemoryCore?.pushMid?.("LAYOUT:" + mode);
    },

    fullScreen(state = true){
        document.body.classList.toggle("full-screen", state);
    },

    compact(state = true){
        document.body.classList.toggle("compact", state);
    },

    expose(){
        window.UILayout = this;
        console.log("🟩 UILayout activo");
    }
};

UILayout.expose();