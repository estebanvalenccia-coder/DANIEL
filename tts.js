/* ============================================================
   HERENCIA IA — TTS (Text To Speech)
   - Fallback Web Speech API
//    ============================================================ */

export const TTS = {
  speak(text, { lang="es-ES", rate=1, pitch=1, volume=1 } = {}) {
    if (!window.speechSynthesis) {
      console.warn("⚠ TTS: speechSynthesis no soportado.");
      return false;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = rate;
    u.pitch = pitch;
    u.volume = volume;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
    return true;
  },

  stop() {
    if (!window.speechSynthesis) return false;
    window.speechSynthesis.cancel();
    return true;
  }
};

window.TTS = TTS;