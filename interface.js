/* ============================================================
   INTERFACE.JS — MOTOR DE INTERFAZ DE HERENCIA IA
   Conexión UI <-> InteractionCore <-> SuperBrain
   COMPLETO · FINAL · REAL
//    ============================================================ */

const InterfaceCore = {

    version: "1.0",

    /* ------------------------------------------------------------
       INICIALIZAR INTERFAZ
    ------------------------------------------------------------ */
    init(){
        this.input = document.getElementById("herencia_input");
        this.output = document.getElementById("herencia_output");
        this.sendBtn = document.getElementById("herencia_send");

        if(this.input && this.sendBtn){
            this.sendBtn.addEventListener("click", ()=> this.send());
            this.input.addEventListener("keypress", e=>{
                if(e.key === "Enter") this.send();
            });
        }

        console.log("🖥️ InterfaceCore iniciada.");
    },

    /* ------------------------------------------------------------
       ENVIAR MENSAJE
    ------------------------------------------------------------ */
    async send(){

        const text = this.input.value.trim();
        if(text === "") return;

        this.printUser(text);

        const reply = await InteractionCore.reply(text);
        this.printAI(reply);

        this.input.value = "";
    },

    /* ------------------------------------------------------------
       MOSTRAR MENSAJE DEL USUARIO
    ------------------------------------------------------------ */
    printUser(text){
        const div = document.createElement("div");
        div.className = "msg user";
        div.innerText = text;
        this.output.appendChild(div);
        this.scroll();
    },

    /* ------------------------------------------------------------
       MOSTRAR RESPUESTA DE LA IA
    ------------------------------------------------------------ */
    printAI(text){
        const div = document.createElement("div");
        div.className = "msg ai";
        div.innerText = text;
        this.output.appendChild(div);
        this.scroll();
    },

    /* ------------------------------------------------------------
       AUTOSCROLL
    ------------------------------------------------------------ */
    scroll(){
        this.output.scrollTop = this.output.scrollHeight;
    },

    /* ------------------------------------------------------------
       EXPOSICIÓN GLOBAL
    ------------------------------------------------------------ */
    expose(){
        window.InterfaceCore = this;
    }
};

window.addEventListener("DOMContentLoaded", ()=>{
    InterfaceCore.init();
    InterfaceCore.expose();
});