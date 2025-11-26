/* ===========================================
      INIT.JS — INICIALIZADOR MAESTRO
//    =========================================== */

(function(){

    /* -------------------------------------------
       1) ESTADO Y NÚCLEO
    ------------------------------------------- */
    if(window.CoreState) CoreState.setReady();
    if(window.CoreDynamics) CoreDynamics.pulse({init:true});
    if(window.CoreSupervisor) CoreSupervisor.watch({init:true});


    /* -------------------------------------------
       2) PIPELINE Y BRIDGES
    ------------------------------------------- */
    const pipelineResult = window.CorePipeline 
        ? CorePipeline.flow({boot:true})
        : null;

    const bridgeResult = window.CoreBridge
        ? CoreBridge.link({pipeline:pipelineResult})
        : null;


    /* -------------------------------------------
       3) SINCRONIZACIÓN GLOBAL
    ------------------------------------------- */
    if(window.CoreSync && bridgeResult){
        window.__SYNC__ = CoreSync.sync(
            {boot:true},
            bridgeResult
        );
    }


    /* -------------------------------------------
       4) REGENERADORES
    ------------------------------------------- */
    const REGEN = {

        logic:   window.LogicRegenerator        || null,
        memory:  window.MemoryRegenerator       || null,
        neural:  window.NeuralRegenerators      || null,

        analitico:      window.RegeneradorAnalitico      || null,
        botanico:       window.RegeneradorBotanico       || null,
        conversacional: window.RegeneradorConversacional || null,
        emocional:      window.RegeneradorEmocional      || null,
        ia:             window.RegeneradorIA             || null,
        modulo:         window.RegeneradorModulo         || null,
        predictivo:     window.RegeneradorPredictivo     || null,
        semantico:      window.RegeneradorSemantico      || null,
        sistema:        window.RegeneradorSistema        || null,
        total:          window.RegeneradorTotalIA        || null
    };


    /* -------------------------------------------
       5) DIAGNÓSTICOS
    ------------------------------------------- */
    const DIAG = {
        purifier:   window.PurificationCore   || null,
        regen:      window.RegenerationBridge || null,
        tools:      window.DiagnosticTools    || null,
        stability:  window.StabilityScan      || null
    };


    /* -------------------------------------------
       6) SEGURIDAD
    ------------------------------------------- */
    const SEC = {
        sandbox:  window.ModuleSandbox     || null,
        shadow:   window.IA_ShadowCore     || null,
        parallel: window.IA_ParallelCore   || null,
        seal:     window.SealManager       || null,
        firewall: window.firewall          || null,
        filters:  window.filters           || null
    };


    /* -------------------------------------------
       7) SISTEMA DE IDIOMA
    ------------------------------------------- */
    if(window.system) system.load && system.load();
    if(window.I18N)   I18N.init && I18N.init();


    /* -------------------------------------------
       8) SUPERSISTEMA IA
    ------------------------------------------- */
    if(window.superbrain){
        superbrain.boot && superbrain.boot();
        superbrain.warmup && superbrain.warmup();
    }


    /* -------------------------------------------
       9) EXPANDERS
    ------------------------------------------- */
    if(window.ExpanderA) ExpanderA.expand && ExpanderA.expand();
    if(window.ExpanderB) ExpanderB.expand && ExpanderB.expand();
    if(window.ExpanderC) ExpanderC.expand && ExpanderC.expand();


    /* -------------------------------------------
       10) DEV MENU PRO
    ------------------------------------------- */
    if(window.DevMenuPRO) DevMenuPRO.init && DevMenuPRO.init();

    if(window.DevProAutorun) DevProAutorun.start && DevProAutorun.start();
    if(window.DevProBridge)  DevProBridge.connect && DevProBridge.connect({dev:true});


    /* -------------------------------------------
       11) ESTADO FINAL
    ------------------------------------------- */
    if(window.CoreState) CoreState.setActive();


    /* -------------------------------------------
       12) LOG INTERNO
    ------------------------------------------- */
    console.log("%cINIT COMPLETADO", "color:#0f0;font-weight:bold;");


})();