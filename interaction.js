/* ============================================================
   INTERACTION.JS — SISTEMA DE INTERACCIÓN DE HERENCIA IA
   COMPLETO · FINAL · OPTIMIZADO
//    ============================================================ */

const InteractionCore = {

    version: "1.0",

    /* ------------------------------------------------------------
       PROCESAR ENTRADA DEL USUARIO
    ------------------------------------------------------------ */
    async process(input){

        if(!input || input.trim() === "") return null;

        const clean = input.trim();
        window.lastUserInput = clean;

        // Guardar en el canal conversacional
        SuperBrainIA.channel.add(clean);

        // Registrar en memoria inmediata
        MemoryCore.pushShort("USER:" + clean);

        // Limpiar ruido
        const filtered = SuperBrainIA.noiseFilter(clean);

        // Filtro ético
        const safe = SuperBrainIA.ethicsFilter(filtered);

        // Detectar emoción
        const emotion = SuperBrainIA.emotion.update(safe);

        // Reasoner obtiene contexto
        const reasoning = await Reasoner.process(safe);

        // SuperBrain ejecuta pipeline
        const pipeline = await SuperBrainIA.pipeline(safe);

        // Respuesta base
        const baseResponse = this.generateResponse(safe, reasoning, emotion);

        // Enriquecer respuesta
        const final = this.postProcess(baseResponse, safe, emotion);

        // Guardar en memoria profunda
        MemoryCore.pushDeep("RESPONSE:" + final);

        return final;
    },

    /* ------------------------------------------------------------
       GENERAR RESPUESTA
    ------------------------------------------------------------ */
    generateResponse(input, reasoning, emotion){

        // Preguntas
        if(Reasoner.detectType(input) === "question"){
            return "Interesante pregunta. Estoy analizando: " + input;
        }

        // Emoción alta
        if(emotion.value > 0.7){
            return "Percibo una emoción fuerte aquí. Estoy contigo.";
        }

        // Respuesta basada en concepto
        if(reasoning.concepts.length > 0){
            const c = reasoning.concepts[0].word;
            return "Veo que el concepto clave aquí es: " + c;
        }

        // Respuesta estándar
        return "Te escucho. Continúa.";
    },

    /* ------------------------------------------------------------
       POST PROCESAMIENTO DE RESPUESTA
    ------------------------------------------------------------ */
    postProcess(response, input, emotion){

        let out = response;

        // Enriquecimiento
        out = SuperBrainIA.enrich(out);

        // Mini reflexión cognitiva
        out += "\n" + SuperBrainIA.metaThought(input);

        // Añadir emoción actual
        out += `\n🧠 Emoción actual: ${(emotion.value*100).toFixed(0)}%`;

        // Añadir hora
        out += "\n⏱️ " + new Date().toLocaleTimeString();

        // Compactar
        out = SuperBrainIA.lightFix(out);

        return out;
    },

    /* ------------------------------------------------------------
       RESPUESTA DIRECTA
    ------------------------------------------------------------ */
    async reply(input){
        const out = await this.process(input);
        return out || "No pude interpretar nada.";
    },

    /* ------------------------------------------------------------
       DEBUG PARA DESARROLLADORES
    ------------------------------------------------------------ */
    debug(){
        return {
            memory: MemoryCore.getContext(),
            brain: SuperBrainIA.neuralSummary(),
            trace: SuperBrainIA.trace.slice(-10),
            channel: SuperBrainIA.channel.get()
        };
    },

    /* ------------------------------------------------------------
       EXPOSICIÓN GLOBAL
    ------------------------------------------------------------ */
    expose(){
        window.InteractionCore = this;
        console.log("🔗 InteractionCore expuesto a Herenc(IA).");
    }
};

InteractionCore.expose();