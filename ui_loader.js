/* ============================================================
   HERENC(IA) — UI LOADER FINAL
   RECONSTRUCCIÓN COMPATIBLE CON TU PROYECTO ORIGINAL
   Sin cambiar tu diseño visual
   ============================================================ */

window.UILoader = {

    async load(){

        console.log("🚀 UILoader: iniciando carga de UI…");

        // 1. Layout base
        try {
            window.UILayout?.set?.("default");
            console.log("🧩 UILayout aplicado.");
        } catch(e){
            console.warn("UILayout no cargó:", e);
        }

        // 2. HUD
        try {
            window.HUD?.flash?.("HUD listo.");
            console.log("🎛 HUD inicializado.");
        } catch(e){
            console.warn("HUD no cargó:", e);
        }

        // 3. UI principal (CHAT + BOTONES + SCANNER + MIC + MENU)
        try {
            window.UIChat?.init?.();
            console.log("💬 UIChat inicializado.");
        } catch(e){
            console.error("UIChat falló:", e);
        }

        // 4. Quick Actions (si existe)
        try {
            window.QuickActions?.init?.();
            console.log("⚡ QuickActions listo.");
        } catch(e){
            console.warn("QuickActions no cargó:", e);
        }

        // 5. Pane manager (si existe)
        try {
            window.UIPane?.init?.();
            console.log("🗂 Pane manager listo.");
        } catch(e){
            console.warn("UIPane no cargó:", e);
        }

        // 6. Bridge interno
        try {
            window.UIBridge?.init?.();
            console.log("🔗 UIBridge listo.");
        } catch(e){
            console.warn("UIBridge no cargó:", e);
        }

        // 7. Estado UI
        try {
            window.UIState?.setReady?.();
            console.log("📦 UIState marcado como READY.");
        } catch(e){
            console.warn("UIState no cargó:", e);
        }

        // 8. DevMenu PRO si existe
        try {
            if (window.DevMenuPRO?.init){
                window.DevMenuPRO.init();
                console.log("🛠 DevMenu PRO listo.");
            }
        } catch(e){
            console.warn("DevMenuPRO no cargó:", e);
        }

        return { uiLoaded:true, ts: Date.now() };
    }
};

// AUTOCARGA CUANDO EL DOM ESTÁ LISTO
window.addEventListener("DOMContentLoaded", () => {
    console.log("🔥 DOM listo. Ejecutando UILoader.load()…");
    window.UILoader.load();
});
