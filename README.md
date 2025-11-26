# Herenc(IA) — SuperBrain IA (Proyecto Valencia Bravo D.E.)

> **CREADO POR HERENCIA, BY: VALENCIA BRAVO D.E.**

Herenc(IA) es una IA botánica conversacional basada en un núcleo neuronal propio llamado **SuperBrainIA**, con **3000 neuronas simuladas**, memoria multinivel, auto‑reparación, feeder de aprendizaje y un sistema de diagnóstico para plantas (hongos, insectos, cuidados, toxicidad).  
Incluye además un **DevMenu normal** y un **DevMenu PRO oculto** para control total del sistema.

---

## ✨ Características principales

- 🧠 **SuperBrainIA (3000 neuronas)**
  - Mutación neuronal ligera
  - Reproducción neuronal periódica
  - Auto‑maintenance / deep repair
  - Compresor + expansor cognitivo
  - Reselladores, reconectores y purificadores
- 📚 **Memoria multinivel**
  - short / mid / long
  - persistencia en `localStorage`
  - export/import desde DevMenu
- 🌱 **Botánica inteligente**
  - Identificación PlantID (texto/imagen)
  - Trefle para taxonomía y fichas
  - Motor GoogleCSE para búsqueda profunda
  - APIs internas para:
    - hongos
    - insectos/plagas
    - cuidados
    - tóxicos
- 🎙 **Audio Walkie‑Talkie**
  - STT (speech‑to‑text)
  - TTS (text‑to‑speech)
  - Micro presionar‑hablar / soltar‑enviar
- 🩺 **Diagnóstico UI**
  - texto / imagen / historial
  - integración con APIs botánicas
- 🛡 **Seguridad**
  - MasterControl flags
  - SafeMode
  - Emergency Stop / Resume
  - Encryption exportable
- 🛠 **DevMenu**
  - Normal (panel rápido)
  - PRO oculto (PIN en chat)
  - Control total de módulos y neuronas

---

## 🗂️ Estructura del proyecto

```
/index.html                (launcher final)
/README.md

/core/
  superbrain.js
  neurons_connector.js
  neurons_integration.js
  core_superbrain_bridge.js
  ...otros módulos core

/api/
  plantid.js
  trefle.js
  google.js
  cse.js
  hongos.js
  insectos.js
  cuidados.js
  toxicos.js
  api_globals_bridge.js

/audio/
  stt.js
  tts.js
  micController.js
  speakerController.js
  ...audio legacy

/security/
  masterControl.js
  safemode.js
  emergency.js
  encryption.js

/diagnostics/
  diagnosticoUI.js
  ...engines/diagnostics

/dev/
  devmenu.js
  devmenu_pro.js

/ui/
  ui.js
  layout.css
  animations.css
  ...otros ui
```

---

## ▶️ Cómo ejecutar

1. Abre `index.html` en navegador (Chrome recomendado).
2. La UI se crea sola si falta layout.
3. Escribe al chat o usa el micro 🎤.

> Si abres sin `index.html`, puedes cargar módulos manualmente con scripts `type="module"`.

---

## 🔐 DevMenu

### DevMenu normal
- Teclas: **Ctrl + Shift + D**
- Controla flags, memoria, neuronas, SafeMode y Emergency.

### DevMenu PRO oculto
- PIN: **`139898.`**
- Se abre desde botón PRO o escribiendo el PIN donde se configure.
- Panel estilo Android con secciones PRO.

---

## 🔑 Configuración de APIs

En DevMenu PRO puedes guardar keys:

- **PlantID API Key**
- **Trefle Token**

Se guardan en `localStorage`:

- `PLANTID_KEY`
- `TREFLE_TOKEN`

---

## 🧪 Diagnóstico

Abrir diagnóstico:

- Botón 🩺 en UI
- DevMenu PRO → Diagnóstico
- O por consola:

```js
DiagnosticoMenu.open();
```

---

## 🧾 Notas importantes

- No eliminar botones visibles del cliente (WhatsApp, ubicación, estetoscopio, etc.).
- Respetar el orden del árbol del proyecto.
- El núcleo debe permanecer unificado en `superbrain.js`.

---

## 📌 Firma

**CREADO POR HERENCIA, BY: VALENCIA BRAVO D.E.**
