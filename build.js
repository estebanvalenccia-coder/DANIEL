/* ===========================================
      BUILD.JS — COMPILACIÓN MAESTRA
//    =========================================== */

(function(){

    /* -------------------------------------------
       OBJETO MAESTRO DEL SISTEMA
    ------------------------------------------- */
    const BUILD = {

        ts: Date.now(),
        version: "1.0.0",
        ok: true,

        /* ---------------------------------------
           COMPONENTES CENTRALES
        ----------------------------------------- */
        core: {
            state:        window.CoreState        || null,
            dynamics:     window.CoreDynamics     || null,
            bridge:       window.CoreBridge       || null,
            pipeline:     window.CorePipeline     || null,
            sync:         window.CoreSync         || null,
            supervisor:   window.CoreSupervisor   || null,
            init:         window.CoreInit         || null
        },

        /* ---------------------------------------
           SUPERBRAIN
        ----------------------------------------- */
        brain: {
            map:          window.brainmap         || null,
            master:       window.superbrain       || null,
            logic:        window.reasoner         || null,
            memory:       window.memory           || null,
            learning:     window.learning         || null,
            perception:   window.perception       || null,
            render:       window.render           || null,
            interactor:   window.interaction      || null
        },

        /* ---------------------------------------
           INTERFACE
        ----------------------------------------- */
        ui: {
            state:        window.UIState          || null,
            manager:      window.UI_Manager       || null,
            controller:   window.UI_Controller    || null,
            events:       window.UI_Events        || null,
            bridge:       window.UIBridge         || null,
            loader:       window.UILoader         || null,
            hud:          window.HUD              || null,
            panel:        window.ControlPanel     || null,
            quick:        window.QuickActions     || null
        },

        /* ---------------------------------------
           DIAGNÓSTICOS
        ----------------------------------------- */
        diagnostics: {
            purifier:     window.PurificationCore   || null,
            regen:        window.RegenerationBridge || null,
            tools:        window.DiagnosticTools    || null,
            stability:    window.StabilityScan      || null,
            analyzer:     window.analyzer           || null,
            logger:       window.logger             || null
        },

        /* ---------------------------------------
           SEGURIDAD
        ----------------------------------------- */
        security: {
            sandbox:      window.ModuleSandbox     || null,
            shadow:       window.IA_ShadowCore     || null,
            parallel:     window.IA_ParallelCore   || null,
            seal:         window.SealManager       || null,
            firewall:     window.firewall          || null,
            filters:      window.filters           || null
        },

        /* ---------------------------------------
           EXPANSIÓN Y REGENERACIÓN
        ----------------------------------------- */
        regenerators:{
            logic:        window.LogicRegenerator        || null,
            memory:       window.MemoryRegenerator       || null,
            neural:       window.NeuralRegenerators      || null,

            analitico:    window.RegeneradorAnalitico    || null,
            botanico:     window.RegeneradorBotanico     || null,
            convers:      window.RegeneradorConversacional || null,
            emocional:    window.RegeneradorEmocional    || null,
            ia:           window.RegeneradorIA           || null,
            modulo:       window.RegeneradorModulo       || null,
            predict:      window.RegeneradorPredictivo   || null,
            semantico:    window.RegeneradorSemantico    || null,
            sistema:      window.RegeneradorSistema      || null,
            total:        window.RegeneradorTotalIA      || null
        },

        /* ---------------------------------------
           EXPANDERS
        ----------------------------------------- */
        expanders:{
            A: window.ExpanderA || null,
            B: window.ExpanderB || null,
            C: window.ExpanderC || null
        },

        /* ---------------------------------------
           API
        ----------------------------------------- */
        api:{
            internal:     window.API_Internal    || null,
            external:     window.API_External    || null,
            proxy:        window.API_Proxy       || null,
            bridge:       window.API_Bridge      || null,
            requests:     window.API_Requests    || null,
            responses:    window.API_Responses   || null,
            filters:      window.API_Filters     || null,
            auth:         window.API_Auth        || null,
            translator:   window.API_Translator  || null,
            helper:       window.API_Helper      || null,

            browser:      window.browser         || null,
            google:       window.google          || null,
            plantid:      window.plantid         || null,
            weather:      window.weather         || null,
            trefle:       window.trefle          || null
        },

        /* ---------------------------------------
           IDIOMA
        ----------------------------------------- */
        lang:{
            system:       window.system          || null,
            engine:       window.I18N            || null
        },

        /* ---------------------------------------
           DEV PRO
        ----------------------------------------- */
        dev:{
            menu:         window.DevMenuPRO      || null,
            autorun:      window.DevProAutorun   || null,
            bridge:       window.DevProBridge    || null
        }

    };


    /* -------------------------------------------
       EJECUCIÓN DEL BUILD
    ------------------------------------------- */
    window.__BUILD__ = BUILD;

    console.log(
        "%cBUILD COMPLETADO — TODO CARGADO",
        "color:#0f0;font-weight:bold;font-size:14px;"
    );

})();