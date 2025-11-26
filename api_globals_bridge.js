/* ============================================================
   HERENCIA IA — API GLOBALS BRIDGE
   Expone los globals exactos que SuperBrainIA.apiRouter usa:
   - PlantID
   - Trefle
   - GoogleCSE
//    ============================================================ */

import { PlantID } from "./plantid.js";
import { TrefleAPI } from "./trefle.js";
import * as GoogleModule from "./google.js";

// PlantID
window.PlantID = window.PlantID || PlantID;

// Trefle (usa el alias correcto)
window.Trefle = window.Trefle || window.TrefleAPI || TrefleAPI;

// GoogleCSE (tu archivo real es google.js)
window.GoogleCSE = window.GoogleCSE || GoogleModule;

console.log("🔌 API globals bridge listo.");