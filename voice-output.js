/* ============================================================
   VOICE-OUTPUT — Síntesis de voz multilenguaje HERENCIA IA
   Habla en el idioma seleccionado por el usuario
//    ============================================================ */

const VoiceOutput = {

    speak(text, langCode){
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = langCode;
        window.speechSynthesis.speak(msg);
    },

    expose(){
        window.VoiceOutput = this;
    }
};

VoiceOutput.expose();