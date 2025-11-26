/* ============================================================
   PLAYER.JS — Reproductor de audio en HERENCIA IA
   Maneja sonidos TTS, efectos o respuestas habladas
//    ============================================================ */

const AudioPlayer = {

    playBase64(base64){
        const audio = new Audio(base64);
        audio.play().catch(e => console.error("Audio error:", e));
    },

    speak(text){
        try{
            const msg = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(msg);
        }catch(e){
            console.error("TTS error:", e);
        }
    },

    beep(){
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    },

    expose(){
        window.AudioPlayer = this;
    }
};

AudioPlayer.expose();