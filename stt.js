/* ============================================================
   HERENCIA IA — STT (Speech To Text)
   - Usa tu recorder/microphone si existen
   - Fallback: Web Speech API
//    ============================================================ */

export const STT = {
  active: false,
  recog: null,
  onText: null,
  onError: null,

  init({ lang="es-ES", onText, onError } = {}) {
    this.onText = onText || null;
    this.onError = onError || null;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("⚠ STT: SpeechRecognition no soportado.");
      return false;
    }

    this.recog = new SpeechRecognition();
    this.recog.lang = lang;
    this.recog.continuous = true;
    this.recog.interimResults = true;

    this.recog.onresult = (event) => {
      let finalText = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) finalText += res[0].transcript;
      }
      if (finalText && this.onText) this.onText(finalText.trim());
    };

    this.recog.onerror = (e) => {
      console.warn("STT error:", e);
      if (this.onError) this.onError(e);
    };

    return true;
  },

  start() {
    if (!this.recog) return false;
    this.active = true;
    this.recog.start();
    console.log("🎙 STT activo.");
    return true;
  },

  stop() {
    if (!this.recog) return false;
    this.active = false;
    this.recog.stop();
    console.log("🛑 STT detenido.");
    return true;
  }
};

window.STT = STT;