/* ============================================================
   LEARNING.JS — SISTEMA DE APRENDIZAJE CENTRAL DE HERENCIA IA
   COMPLETO · FINAL · OPTIMIZADO
   Conecta Reasoner + Feeder + SuperBrain + MemoryCore
//    ============================================================ */

const LearningCore = {

    version: "1.0",

    /* ------------------------------------------------------------
       PROCESAR Y APRENDER DESDE TEXTO
    ------------------------------------------------------------ */
    async learn(text){

        if(!text || text.trim() === "") return null;

        const clean = text.trim();

        // Guardar en memoria
        MemoryCore.pushShort("LEARN:" + clean);

        // Feeder de texto
        Feeder.learnText(clean);

        // Reasoner procesa estructura
        const reasoning = await Reasoner.process(clean);

        // SuperBrain analiza emoción
        const emotion = SuperBrainIA.emotion.update(clean);

        // Registrar en mid memory
        MemoryCore.pushMid(JSON.stringify({clean, reasoning, emotion}));

        // Ejecución del pipeline
        const pipeline = await SuperBrainIA.pipeline(clean);

        // Guardar en memoria profunda
        MemoryCore.pushLong("PIPELINE:" + JSON.stringify(pipeline));

        return {
            clean,
            reasoning,
            emotion,
            pipeline
        };
    },

    /* ------------------------------------------------------------
       APRENDER DESDE URL
    ------------------------------------------------------------ */
    async learnURL(url){
        const html = await Feeder.learnURL(url);
        if(html){
            MemoryCore.pushLong("LEARN_URL:" + url);
            return this.learn(html.slice(0, 1000)); // evitar texto enorme
        }
        return null;
    },

    /* ------------------------------------------------------------
       APRENDER DESDE IMAGEN (API)
    ------------------------------------------------------------ */
    async learnImage(base64){
        const result = await Feeder.learnImage(base64);
        if(result){
            MemoryCore.pushLong("LEARN_IMG:" + JSON.stringify(result));
        }
        return result;
    },

    /* ------------------------------------------------------------
       APRENDER DESDE API
    ------------------------------------------------------------ */
    async learnAPI(query){
        const result = await Feeder.learnAPI(query);
        if(result){
            MemoryCore.pushLong("LEARN_API:" + query);
        }
        return result;
    },

    /* ------------------------------------------------------------
       APRENDIZAJE COMPLETO (MULTIFUENTE)
    ------------------------------------------------------------ */
    async fullLearn(input){

        const out = {
            text: null,
            api: null,
            image: null,
            reasoning: null,
            pipeline: null,
            ts: Date.now()
        };

        // Aprender desde texto
        out.text = await this.learn(input);

        // Aprender desde API
        out.api = await this.learnAPI(input);

        // Solo si el texto parece ser base64
        if(input.length > 500 && /[A-Za-z0-9+/=]/.test(input)){
            out.image = await this.learnImage(input);
        }

        // Generar razonamiento final
        out.reasoning = await Reasoner.think(input);

        // Pipeline final
        out.pipeline = await SuperBrainIA.pipeline(input);

        // Guardar todo en memoria profunda
        MemoryCore.pushDeep(JSON.stringify(out));

        return out;
    },

    /* ------------------------------------------------------------
       MODO AUTOMÁTICO DE APRENDIZAJE
    ------------------------------------------------------------ */
    autoLearn(input){
        if(!input) return;
        this.learn(input);
        if(Math.random() < 0.2){
            ReproductionCore.autoCycle();
        }
    },

    /* ------------------------------------------------------------
       CICLO AUTOMÁTICO
    ------------------------------------------------------------ */
    startAuto(){
        setInterval(()=>{
            if(window.lastUserInput){
                this.autoLearn(window.lastUserInput);
            }
        }, 15000);

        console.log("🔁 LearningCore: modo automático activado.");
    },

    /* ------------------------------------------------------------
       EXPOSICIÓN GLOBAL
    ------------------------------------------------------------ */
    expose(){
        window.LearningCore = this;
        console.log("🔗 LearningCore expuesto a Herenc(IA).");
    }
};

/* ------------------------------------------------------------
   AUTO-INICIALIZACIÓN
------------------------------------------------------------ */
LearningCore.expose();
LearningCore.startAuto();