/* =====================================================
      BUILD FULL — SISTEMA COMPLETO SIN NULL
//    ===================================================== */

(function(){

    const LOAD = name => window[name] ? window[name] : {missing:name};

    const BUILD = {

        version: "2.0.0",
        ts: Date.now(),
        ok: true,

        /* ---------------------------------------
           CORE
        ----------------------------------------- */
        core:{
            state:      LOAD("CoreState"),
            dynamics:   LOAD("CoreDynamics"),
            pipeline:   LOAD("CorePipeline"),
            bridge:     LOAD("CoreBridge"),
            sync:       LOAD("CoreSync"),
            supervisor: LOAD("CoreSupervisor")
        },

        /* ---------------------------------------
           SUPERBRAIN IA
        ----------------------------------------- */
        brain:{
            super:      LOAD("superbrain"),
            reasoner:   LOAD("reasoner"),
            memory:     LOAD("memory"),
            learning:   LOAD("learning"),
            perception: LOAD("perception"),
            render:     LOAD("render"),
            feeder:     LOAD("feeder"),
            execution:  LOAD("execution"),
            events:     LOAD("events"),
            interface:  LOAD("interface"),
            interaction:LOAD("interaction"),
            reproductions:LOAD("reproductions"),
            brainmap:   LOAD("brainmap"),
            security:   LOAD("security"),
            traslator:  LOAD("traslator")
        },

        /* ---------------------------------------
           UI
        ----------------------------------------- */
        ui:{
            manager:    LOAD("UI_Manager"),
            controller: LOAD("UI_Controller"),
            events:     LOAD("UI_Events"),
            bridge:     LOAD("UIBridge"),
            loader:     LOAD("UILoader"),
            state:      LOAD("UIState"),
            hud:        LOAD("HUD"),
            panel:      LOAD("ControlPanel"),
            quick:      LOAD("QuickActions"),

            animations: LOAD("animations"),
            layout:     LOAD("layout"),
            pane:       LOAD("pane"),
            theme:      LOAD("theme"),
            langpanel:  LOAD("languagePanel"),
            system:     LOAD("system")
        },

        /* ---------------------------------------
           REGENERADORES
        ----------------------------------------- */
        regenerators:{
            logic:      LOAD("LogicRegenerator"),
            memory:     LOAD("MemoryRegenerator"),
            neural:     LOAD("NeuralRegenerators"),

            analitico:  LOAD("RegeneradorAnalitico"),
            botanico:   LOAD("RegeneradorBotanico"),
            convers:    LOAD("RegeneradorConversacional"),
            emocional:  LOAD("RegeneradorEmocional"),
            ia:         LOAD("RegeneradorIA"),
            modulo:     LOAD("RegeneradorModulo"),
            predictivo: LOAD("RegeneradorPredictivo"),
            semantico:  LOAD("RegeneradorSemantico"),
            sistema:    LOAD("RegeneradorSistema"),
            total:      LOAD("RegeneradorTotalIA")
        },

        /* ---------------------------------------
           EXPANDERS
        ----------------------------------------- */
        expanders:{
            A: LOAD("ExpanderA"),
            B: LOAD("ExpanderB"),
            C: LOAD("ExpanderC")
        },

        /* ---------------------------------------
           DIAGNÓSTICOS
        ----------------------------------------- */
        diagnostics:{
            purifier:   LOAD("PurificationCore"),
            regen:      LOAD("RegenerationBridge"),
            tools:      LOAD("DiagnosticTools"),
            stability:  LOAD("StabilityScan"),
            analyzer:   LOAD("analyzer"),
            logger:     LOAD("logger")
        },

        /* ---------------------------------------
           SEGURIDAD
        ----------------------------------------- */
        security:{
            sandbox:    LOAD("ModuleSandbox"),
            shadow:     LOAD("IA_ShadowCore"),
            parallel:   LOAD("IA_ParallelCore"),
            seal:       LOAD("SealManager"),
            firewall:   LOAD("firewall"),
            filters:    LOAD("filters")
        },

        /* ---------------------------------------
           API
        ----------------------------------------- */
        api:{
            internal:   LOAD("API_Internal"),
            external:   LOAD("API_External"),
            proxy:      LOAD("API_Proxy"),
            bridge:     LOAD("API_Bridge"),
            requests:   LOAD("API_Requests"),
            responses:  LOAD("API_Responses"),
            filters:    LOAD("API_Filters"),
            auth:       LOAD("API_Auth"),
            translator: LOAD("API_Translator"),
            helper:     LOAD("API_Helper"),

            browser:    LOAD("browser"),
            google:     LOAD("google"),
            plantid:    LOAD("plantid"),
            trefle:     LOAD("trefle"),
            weather:    LOAD("weather")
        },

        /* ---------------------------------------
           IDIOMA
        ----------------------------------------- */
        lang:{
            system:     LOAD("system"),
            engine:     LOAD("I18N")
        },

        /* ---------------------------------------
           DEV PRO
        ----------------------------------------- */
        dev:{
            menu:       LOAD("DevMenuPRO"),
            autorun:    LOAD("DevProAutorun"),
            bridge:     LOAD("DevProBridge")
        }
    };


    /* -------------------------------------------
       BUILD FINAL — SIN NULL
    ------------------------------------------- */
    window.__BUILD_FULL__ = BUILD;

    console.log(
        "%cBUILD FULL COMPLETO — SIN NULL — SISTEMA LISTO",
        "color:#0f0;font-weight:bold;font-size:16px;"
    );

})();