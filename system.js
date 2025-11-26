/* ============================================================
   SYSTEM.JS — Sistema base de interfaz de HERENCIA IA
   Gestión global de elementos, helpers y utilidades
//    ============================================================ */

const UISystem = {

    qs(selector){
        return document.querySelector(selector);
    },

    qsa(selector){
        return [...document.querySelectorAll(selector)];
    },

    show(el){
        if(typeof el === "string") el = this.qs(el);
        if(el) el.style.display = "block";
    },

    hide(el){
        if(typeof el === "string") el = this.qs(el);
        if(el) el.style.display = "none";
    },

    toggle(el){
        if(typeof el === "string") el = this.qs(el);
        if(!el) return;
        el.style.display = el.style.display === "none" ? "block" : "none";
    },

    on(el, event, fn){
        if(typeof el === "string") el = this.qs(el);
        if(el) el.addEventListener(event, fn);
    },

    addClass(el, cls){
        if(typeof el === "string") el = this.qs(el);
        el?.classList.add(cls);
    },

    removeClass(el, cls){
        if(typeof el === "string") el = this.qs(el);
        el?.classList.remove(cls);
    },

    expose(){
        window.UISystem = this;
        console.log("🟦 UISystem cargado");
    }
};

UISystem.expose();