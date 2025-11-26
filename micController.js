/* ============================================================
   HERENCIA IA — MIC CONTROLLER (Walkie-Talkie)
   - Control de botón mantener-presionado
   - Conecta STT con SuperBrain
//    ============================================================ */

import { STT } from "./stt.js";

export const MicController = {
  listening: false,
  buffer: "",
  onFinalText: null,

  init({ lang="es-ES", onFinalText } = {}) {
    this.onFinalText = onFinalText || null;

    STT.init({
      lang,
      onText: (t) => {
        // va acumulando lo que diga el user
        this.buffer += (this.buffer ? " " : "") + t;
      }
    });
  },

  press() {
    if (this.listening) return;
    this.listening = true;
    this.buffer = "";
    STT.start();
    console.log("🎙 Walkie ON (presionando).");
  },

  release() {
    if (!this.listening) return;
    this.listening = false;
    STT.stop();
    console.log("🛑 Walkie OFF (soltaste).");

    const finalText = this.buffer.trim();
    this.buffer = "";

    if (finalText && this.onFinalText) {
      this.onFinalText(finalText);
    }
  }
};

window.MicController = MicController;