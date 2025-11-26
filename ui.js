/* ============================================================
   HERENC(IA) — UI COMPLETA FINAL + SCANNER / HI-RES
   Archivo: /ui/ui.js
   - Chat principal Herenc(IA)
   - Botones: mic, enviar, +foto, WhatsApp, ubicación, diagnóstico, Scanner, Hi-Res
   - Detecta PIN DevMenu normal (13101098) y PRO (139898.)
//    ============================================================ */

// ✅ Carga suave de ui_state.js (no rompe si no existe)
try {
  await import("./ui_state.js");
} catch (e) {
  console.warn("ui_state.js no encontrado, sigo sin estado persistente.");
}

import { MicController } from "../audio/micController.js";
import { SpeakerController } from "../audio/speakerController.js";

const $ = (sel) => document.querySelector(sel);
const el = (tag, props = {}) => Object.assign(document.createElement(tag), props);

const UIChat = {
  root: null,
  list: null,
  input: null,
  btnSend: null,
  btnMic: null,
  btnPlus: null,
  btnWA: null,
  btnLoc: null,
  btnDiag: null,
  btnScan: null,
  btnScanHi: null,

  init() {
    if (this.root) return;
    this.injectBaseStyles();
    this.buildLayout();
    this.bindEvents();
    this.bootMessage();
    this.initAudio();
    console.log("✅ UI completa + Scanner inicializada.");
  },

  injectBaseStyles() {
    if ($("#herencia-ui-styles")) return;
    const style = el("style", { id: "herencia-ui-styles" });
    style.textContent = `
      #herencia-ui-root{
        position:fixed; inset:0; z-index:80000;
        display:flex; flex-direction:column;
        background:#0d0f12; color:#eaeaea;
        font-family:system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
      }
      #herencia-ui-header{
        padding:10px 12px; background:#11151a; border-bottom:1px solid #1f2937;
        display:flex; align-items:center; gap:8px;
      }
      #herencia-ui-title{ font-weight:800; letter-spacing:.3px; }
      #herencia-ui-sub{ font-size:12px; opacity:.7; }
      #herencia-ui-body{
        flex:1; overflow:auto; padding:12px;
        display:flex; flex-direction:column; gap:8px;
      }
      .msg{
        max-width:85%; padding:8px 10px; border-radius:12px; font-size:14px; line-height:1.35;
        white-space:pre-wrap; word-break:break-word;
      }
      .msg.user{ align-self:flex-end; background:#2563eb; color:#fff; border-bottom-right-radius:4px; }
      .msg.bot{ align-self:flex-start; background:#1f2937; color:#fff; border-bottom-left-radius:4px; }
      .msg.sys{ align-self:center; background:#0b0e12; border:1px dashed #334155; font-size:12px; opacity:.9; }

      #herencia-ui-footer{
        padding:8px; border-top:1px solid #1f2937; background:#0b0e12;
        display:flex; flex-direction:column; gap:6px;
      }
      #herencia-ui-row{
        display:flex; align-items:flex-end; gap:6px;
      }
      #herencia-input{
        flex:1; min-height:42px; max-height:140px; resize:none;
        border-radius:12px; border:1px solid #263142; background:#0f1318; color:#fff;
        padding:10px; font-size:14px;
      }
      .herencia-btn{
        height:42px; min-width:42px; border-radius:12px; border:none; cursor:pointer;
        background:#1f2937; color:#fff; display:grid; place-items:center; font-size:16px;
      }
      .herencia-btn:hover{ background:#263142; }
      .herencia-btn.listening{ background:#b91c1c; }

      #herencia-ui-actions{
        display:flex; gap:6px; flex-wrap:wrap;
      }
      .herencia-chip{
        height:34px; padding:0 10px; border-radius:999px; border:none; cursor:pointer;
        background:#11151a; color:#eaeaea; font-size:13px; border:1px solid #1f2937;
      }
      .herencia-chip:hover{ background:#151a20; }

      #herencia-footer-sign{
        text-align:center; font-size:11px; opacity:.6; padding-top:2px;
      }

      #herencia-ui-body::-webkit-scrollbar{ width:8px; }
      #herencia-ui-body::-webkit-scrollbar-thumb{ background:#1f2937; border-radius:8px; }
    `;
    document.head.appendChild(style);
  },

  buildLayout() {
    this.root = el("div", { id: "herencia-ui-root" });

    const header = el("div", { id: "herencia-ui-header" });
    header.append(
      el("div", { id: "herencia-ui-title", textContent: "Herenc(IA)" }),
      el("div", { id: "herencia-ui-sub", textContent: "Botánica conversacional • SuperBrainIA" })
    );

    this.list = el("div", { id: "herencia-ui-body" });

    const footer = el("div", { id: "herencia-ui-footer" });

    this.input = el("textarea", {
      id: "herencia-input",
      placeholder: "Escribe aquí… (Enter envía, Shift+Enter salto)"
    });

    this.btnPlus = el("button", { className: "herencia-btn", title: "Adjuntar foto", textContent: "＋" });
    this.btnMic = el("button", { className: "herencia-btn", id: "btnMic", title: "Hablar (walkie)", textContent: "🎤" });
    this.btnSend = el("button", { className: "herencia-btn", title: "Enviar", textContent: "➤" });

    const row = el("div", { id: "herencia-ui-row" });
    row.append(this.btnPlus, this.input, this.btnMic, this.btnSend);

    const actions = el("div", { id: "herencia-ui-actions" });
    this.btnWA = el("button", { className: "herencia-chip", textContent: "WhatsApp" });
    this.btnLoc = el("button", { className: "herencia-chip", textContent: "📍 Ubicación" });
    this.btnDiag = el("button", { className: "herencia-chip", textContent: "🩺 Diagnóstico" });
    this.btnScan = el("button", { className: "herencia-chip", textContent: "📸 Scanner" });
    this.btnScanHi = el("button", { className: "herencia-chip", textContent: "🔍 Hi‑Res" });

    actions.append(this.btnWA, this.btnLoc, this.btnDiag, this.btnScan, this.btnScanHi);

    const sign = el("div", {
      id: "herencia-footer-sign",
      textContent: "CREADO POR HERENCIA, BY: VALENCIA BRAVO D.E."
    });

    footer.append(row, actions, sign);

    this.root.append(header, this.list, footer);
    document.body.appendChild(this.root);
  },

  bindEvents() {
    this.input.addEventListener("input", () => {
      this.input.style.height = "auto";
      this.input.style.height = Math.min(this.input.scrollHeight, 140) + "px";
    });

    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendFromInput();
      }
    });

    this.btnSend.onclick = () => this.sendFromInput();
    this.btnPlus.onclick = () => this.pickImage();

    this.btnWA.onclick = () => {
      const phone = "573000000000"; // placeholder
      const msg = encodeURIComponent("Hola, necesito ayuda con Herenc(IA).");
      window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
    };

    this.btnLoc.onclick = () => this.shareLocation();
    this.btnDiag.onclick = () => window.DiagnosticoMenu?.open?.();

    this.btnScan.onclick = () => this.openScanner(false);
    this.btnScanHi.onclick = () => this.openScanner(true);

    window.UIChat = {
      appendUser: (t) => this.addMessage("user", t),
      appendBot: (t) => this.addMessage("bot", t),
      appendSys: (t) => this.addMessage("sys", t),
      clear: () => (this.list.innerHTML = "")
    };
  },

  bootMessage() {
    this.addMessage("bot", "Hola, soy Herenc(IA). ¿En qué te ayudo hoy con tus plantas?");
  },

  addMessage(type, text) {
    const m = el("div", { className: `msg ${type}`, textContent: text });
    this.list.appendChild(m);
    this.list.scrollTop = this.list.scrollHeight;
  },

  async sendFromInput() {
    const text = this.input.value.trim();
    if (!text) return;
    this.input.value = "";
    this.input.style.height = "auto";
    await this.handleUserText(text);
  },

  async handleUserText(text) {
    if (text === "13101098") {
      window.DevMenu?.open?.();
      this.addMessage("sys", "🔓 DevMenu normal abierto.");
      return;
    }

    if (text === "139898.") {
      // tu DevMenuPRO expone init/panel/events; no siempre tiene open()
      if (window.DevMenuPRO?.open) window.DevMenuPRO.open();
      else window.DevMenuPRO?.init?.();
      this.addMessage("sys", "🔒 DevMenu PRO abierto.");
      return;
    }

    this.addMessage("user", text);

    if (window.Emergency?.active) {
      this.addMessage("bot", "🚨 Emergency Stop activo. Reanuda desde DevMenu.");
      return;
    }

    try {
      const brain = window.HerenciaSuperBrain;
      const res = brain?.think ? await brain.think(text) : "Core no cargado.";
      this.addMessage("bot", typeof res === "string" ? res : JSON.stringify(res, null, 2));

      SpeakerController.speak(
        typeof res === "string" ? res : JSON.stringify(res),
        { lang: "es-ES" }
      );
    } catch (e) {
      this.addMessage("bot", "⚠️ Error: " + e.message);
    }
  },

  initAudio() {
    MicController.init({
      lang: "es-ES",
      onFinalText: async (texto) => {
        console.log("🎙 Texto detectado:", texto);
        await this.handleUserText(texto);
      }
    });

    const press = () => {
      this.btnMic.classList.add("listening");
      MicController.press();
    };
    const release = () => {
      this.btnMic.classList.remove("listening");
      MicController.release();
    };

    this.btnMic.onmousedown = press;
    this.btnMic.onmouseup = release;
    this.btnMic.onmouseleave = release;

    this.btnMic.ontouchstart = (e) => { e.preventDefault(); press(); };
    this.btnMic.ontouchend = (e) => { e.preventDefault(); release(); };

    console.log("🎤 Mic walkie conectado.");
  },

  // ---------------- IMAGEN / FEEDER ----------------
  pickImage() {
    const inputFile = el("input", { type: "file", accept: "image/*" });
    inputFile.onchange = async () => {
      const f = inputFile.files?.[0];
      if (!f) return;

      const b64 = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(f);
      });

      this.addMessage("sys", "📷 Imagen cargada. Analizando…");

      try {
        let plant = null;
        if (window.PlantID?.identifyImage) {
          plant = await window.PlantID.identifyImage(b64);
        }

        if (window.SuperBrainIA?.feeder?.learnFromImage) {
          await window.SuperBrainIA.feeder.learnFromImage(b64);
        }

        this.addMessage("bot", plant ? ("🌿 PlantID:\n" + JSON.stringify(plant, null, 2)) : "No pude identificar la planta.");
      } catch (e) {
        this.addMessage("bot", "Error analizando imagen: " + e.message);
      }
    };
    inputFile.click();
  },

  // ---------------- SCANNER / HI-RES ----------------
  async openScanner(hires=false){
    this.addMessage("sys", hires ? "🔍 Abriendo Scanner Hi‑Res…" : "📸 Abriendo Scanner…");

    try{
      if(window.Scanner?.open){
        const out = await window.Scanner.open({ hires });
        if(out) this.addMessage("bot", typeof out==="string" ? out : JSON.stringify(out,null,2));
        return;
      }

      if(window.DiagnosticoEngine?.scan){
        const out = await window.DiagnosticoEngine.scan({ hires });
        if(out) this.addMessage("bot", typeof out==="string" ? out : JSON.stringify(out,null,2));
        return;
      }

      this.addMessage("sys", "No hay módulo Scanner detectado. Usa +Imagen.");
    }catch(e){
      this.addMessage("bot", "⚠️ Scanner error: "+e.message);
    }
  },

  // ---------------- UBICACIÓN ----------------
  shareLocation() {
    if (!navigator.geolocation) {
      this.addMessage("bot", "Tu navegador no permite geolocalización.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        this.addMessage("user", `📍 Mi ubicación: ${link}`);
      },
      (err) => {
        this.addMessage("bot", "No pude obtener la ubicación: " + err.message);
      }
    );
  }
};

window.addEventListener("DOMContentLoaded", () => UIChat.init());


   


