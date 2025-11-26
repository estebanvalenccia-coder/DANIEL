/* ============================================================
   MICROPHONE.JS — Gestión del micrófono en HERENCIA IA
   Captura de audio · Activación · Permisos
//    ============================================================ */

const Microphone = {

    stream: null,
    active: false,

    async start(){
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.active = true;
            console.log("🎤 Mic ON");
            return this.stream;
        } catch(e){
            console.error("Mic error:", e);
            return null;
        }
    },

    stop(){
        if(this.stream){
            this.stream.getTracks().forEach(t => t.stop());
            this.stream = null;
        }
        this.active = false;
        console.log("🎤 Mic OFF");
    },

    isActive(){
        return this.active;
    },

    expose(){
        window.Microphone = this;
    }
};

Microphone.expose();