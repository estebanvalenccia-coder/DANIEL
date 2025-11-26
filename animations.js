/* ============================================================
   ANIMATIONS.JS — Animaciones base de la interfaz
   Pulsos, brillos y transiciones visuales
//    ============================================================ */

const UIAnimations = {

    pulse(el){
        if(typeof el === "string") el = document.querySelector(el);
        if(!el) return;
        el.classList.add("pulse");
        setTimeout(() => el.classList.remove("pulse"), 600);
    },

    glow(el){
        if(typeof el === "string") el = document.querySelector(el);
        if(!el) return;
        el.classList.add("glow");
        setTimeout(() => el.classList.remove("glow"), 1000);
    },

    flashScreen(){
        document.body.classList.add("flash");
        setTimeout(()=> document.body.classList.remove("flash"), 150);
    },

    expose(){
        window.UIAnimations = this;
        console.log("💠 UIAnimations inicializado");
    }
};

UIAnimations.expose();