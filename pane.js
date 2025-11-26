/* ============================================================
   PANE.JS — Panel lateral / menú del sistema HERENCIA IA
   Abre, cierra y actualiza paneles UI
//    ============================================================ */

const UIPane = {

    open(id){
        const el = document.getElementById(id);
        if(el){
            el.classList.add("open");
            MemoryCore?.pushShort?.("PANE_OPEN:" + id);
        }
    },

    close(id){
        const el = document.getElementById(id);
        if(el){
            el.classList.remove("open");
            MemoryCore?.pushShort?.("PANE_CLOSE:" + id);
        }
    },

    toggle(id){
        const el = document.getElementById(id);
        if(!el) return;
        el.classList.toggle("open");
    },

    isOpen(id){
        return document.getElementById(id)?.classList.contains("open") || false;
    },

    expose(){
        window.UIPane = this;
        console.log("🧩 UIPane listo");
    }
};

UIPane.expose();