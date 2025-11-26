/* ============================================================
   HERENCIA IA — SPEAKER CONTROLLER
   Controla salida de voz del sistema
//    ============================================================ */

import { TTS } from "./tts.js";

export const SpeakerController = {
  speaking: false,

  speak(text, opts={}) {
    this.speaking = true;
    TTS.speak(text, opts);
  },

  stop() {
    this.speaking = false;
    TTS.stop();
  }
};

window.SpeakerController = SpeakerController;