diff --git a/core_loader.js b/core_loader.js
new file mode 100644
index 0000000000000000000000000000000000000000..5a0eeb6df9f32e54596a220d32ef27bd4923c124
--- /dev/null
+++ b/core_loader.js
@@ -0,0 +1,158 @@
+/* ===============================================================
+   HERENCIA IA — CORE LOADER DEFINITIVO (SIN CAOS)
+   - /core/ se carga en ORDEN REAL
+   - otras carpetas automático después
+   - evita dobles cargas
+   =============================================================== */
+
+const CORE_LOADER = {
+  coreOrden: [
+    "./core/api.js",
+    "./core/brainmap.js",
+
+    "./core/build.js",
+    "./core/build_full.js",
+
+    "./core/conciencia_bridge_reproduccion.js",
+    "./core/conciencia_ia.js",
+
+    "./core/core_bridge.js",
+    "./core/core_connectors_hub.js",
+    "./core/core_dynamics.js",
+    "./core/core_pipeline.js",
+    "./core/core_state.js",
+    "./core/core_superbrain_bridge.js",
+
+    "./core/ethics.js",
+    "./core/herencia_personality_bridge.js",
+    "./core/herencia_pipeline_core.js",
+
+    "./core/ia_mutacion_avanzada.js",
+    "./core/ia_personalidad_system.js",
+    "./core/ia_personality_core.js",
+    "./core/ia_receiver_patch.js",
+    "./core/ia_roles_system.js",
+    "./core/ia_states_system.js",
+
+    "./core/init.js",
+    "./core/interaction.js",
+    "./core/interface.js",
+    "./core/learning.js",
+
+    "./core/matriz_reproduccion_ia.js",
+    "./core/memoria_bridge_reproduccion.js",
+
+    "./core/memory.js",
+    "./core/memory_bridge.js",
+
+    "./core/neurons_connector.js",
+    "./core/neurons_integration.js",
+    "./core/perception.js",
+
+    "./core/pipeline.js",
+    "./core/pipeline_bridge_reproduccion.js",
+    "./core/puente_superbrain_matriz.js",
+
+    "./core/reasoner.js",
+
+    // ✅ TU SISTEMA UNIFICADO
+    "./core/diagnostics_unified_system.js",
+
+    "./core/render.js",
+    "./core/reproduction.js",
+    "./core/reproductions.js",
+
+    "./core/security.js",
+    "./core/seguridad_bridge_reproduccion.js",
+
+    "./core/super_ias.js",
+    "./core/superbrain.router.js",
+    "./core/superbrain_bridge_reproduccion.js",
+    "./core/superbrain_reproduction_bridge.js",
+
+    "./core/superbrain.js",
+    "./core/traslator.js",
+  ],
+
+  rutasAuto: [
+    "./api/",
+    "./diagnostics/",
+    "./expanders/",
+    "./security/",
+    "./audio/",
+    "./js/",
+    "./lang/",
+    "./regenerators/",
+    "./ui/",
+  ],
+
+  cargados: new Set(),
+  cacheBust: `?v=${Date.now()}`,
+
+  async iniciar() {
+    console.log("🌿 Iniciando HERENC(IA) Loader…");
+
+    for (const ruta of this.coreOrden) {
+      await this.cargarArchivo(ruta);
+    }
+
+    for (const carpeta of this.rutasAuto) {
+      await this.cargarCarpetaAuto(carpeta);
+    }
+
+    console.log("🌱 Todos los módulos han sido cargados.");
+
+    if (window.HerenciaSuperBrain?.init) {
+      window.HerenciaSuperBrain.init();
+      console.log("💚 HerenciaSuperBrain iniciada correctamente.");
+    } else if (window.SuperBrain?.init) {
+      window.SuperBrain.init();
+      console.log("💚 SuperBrain iniciado.");
+    } else {
+      console.warn("⚠️ No se encontró init() en SuperBrain/HerenciaSuperBrain.");
+    }
+  },
+
+  async cargarArchivo(ruta) {
+    const normalizada = ruta.startsWith("./") ? ruta : `./${ruta}`;
+    if (this.cargados.has(normalizada)) return;
+
+    try {
+      await import(normalizada + this.cacheBust);
+      this.cargados.add(normalizada);
+      console.log("✔ Cargado:", normalizada);
+    } catch (err) {
+      console.error("❌ Error cargando:", normalizada, err);
+    }
+  },
+
+  async cargarCarpetaAuto(carpeta) {
+    try {
+      const archivos = await this.obtenerArchivosDeCarpeta(carpeta);
+      for (const archivo of archivos) {
+        await this.cargarArchivo(carpeta + archivo);
+      }
+    } catch (e) {
+      console.warn("⚠ Carpeta no accesible:", carpeta, e?.message ?? e);
+    }
+  },
+
+  async obtenerArchivosDeCarpeta(carpeta) {
+    const respuesta = await fetch(carpeta);
+    const html = await respuesta.text();
+    const coincidencias = html.match(/href="([^"]+\.js)"/g) ?? [];
+
+    return coincidencias
+      .map((ref) => ref.replace('href="', "").replace('"', ""))
+      .filter((archivo) => !archivo.startsWith("./"))
+      .filter((archivo) => archivo.endsWith(".js"))
+      .sort();
+  },
+};
+
+if (!window.__HERENCIA_LOADER_INIT__) {
+  window.__HERENCIA_LOADER_INIT__ = true;
+  window.addEventListener("DOMContentLoaded", () => CORE_LOADER.iniciar());
+}
+
+export default CORE_LOADER;
