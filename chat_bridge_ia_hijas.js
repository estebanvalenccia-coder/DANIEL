/* ===========================================================================
   PUENTE CHAT/UX ↔ IA HIJAS — HERENCIA IA
   Permite seleccionar qué IA responde en el chat y dar estilo propio
   a cada IA hija (color, avatar, nombre, modo, etc).
//    =========================================================================== */

export const ChatIAReproductionBridge = {

    iaActual: "madre",   // madre = SuperBrain, hija = ID de IA hija
    hijas: [],           // lista de IA hijas disponibles

    init(){
        console.log("💬🔌 Puente Chat ↔ IA Hijas activo.");
        this.injectSelectorUI();
        this.bindChatOverride();
    },

    /* ============================================================
       1) UI para seleccionar IA (selector visual)
//        ============================================================ */
    injectSelectorUI(){

        const selector = document.createElement("div");
        selector.id = "selector-ia";
        selector.style.position = "absolute";
        selector.style.top = "10px";
        selector.style.right = "10px";
        selector.style.background = "rgba(0,0,0,0.6)";
        selector.style.color = "#fff";
        selector.style.padding = "10px";
        selector.style.borderRadius = "10px";
        selector.style.zIndex = "9999";
        selector.style.fontFamily = "sans-serif";

        selector.innerHTML = `
            <label>🤖 Seleccionar IA:</label><br>
            <select id="ia-selector" style="margin-top:5px;width:180px;">
                <option value="madre">SuperBrain (Madre)</option>
            </select>
        `;

        document.body.appendChild(selector);

        document.querySelector("#ia-selector")
            .addEventListener("change", (e) => {
                this.iaActual = e.target.value;
            });
    },

    /* ============================================================
       2) Registrar IA hija para aparecer en el chat
//        ============================================================ */
    registrarHija(ia){

        if(!ia) return;

        this.hijas.push(ia);

        // Agregar al selector
        const selector = document.querySelector("#ia-selector");
        if(selector){
            const opt = document.createElement("option");
            opt.value = ia.id;
            opt.innerText = ia.id + " (IA hija)";
            selector.appendChild(opt);
        }

        console.log("💬 Hija registrada en el chat:", ia.id);
    },

    /* ============================================================
       3) Inyectar comportamiento al sistema de chat
//        ============================================================ */
    bindChatOverride(){

        if(!window.ChatController){
            console.warn("❌ ChatController no encontrado.");
            return;
        }

        const originalSend = ChatController.sendMessage;

        ChatController.sendMessage = async (msg) => {

            // Mensaje del usuario → chat normal
            originalSend.call(ChatController, msg);

            // Determinar IA activa
            let iaResponder = null;

            if(this.iaActual === "madre"){
                iaResponder = window.SuperBrainIA;
            } else {
                iaResponder = this.hijas.find(h => h.id === this.iaActual);
            }

            if(!iaResponder){
                console.warn("⚠️ No se encontró IA activa.");
                return;
            }

            // Supervisión y seguridad
            if(ConcienciaIA.state.suspicious){
                ChatController.addBotMessage("⚠️ ConcienciaIA bloqueó respuesta.");
                return;
            }

            if(!SecurityPRO.state.integrityOK){
                ChatController.addBotMessage("⛔ Sistema en modo seguro. IA desactivada.");
                return;
            }

            // Obtener respuesta IA (madre o hija)
            let respuesta;
            try{
                respuesta = await iaResponder.pensar(msg);
            } catch(e){
                respuesta = "⚠️ Error en la IA activa";
            }

            // Mostrar respuesta en el chat
            this.addIAMessage(iaResponder, respuesta);
        };
    },

    /* ============================================================
       4) Mensaje visual con estilo propio por IA hija
//        ============================================================ */
    addIAMessage(ia, texto){

        if(!window.ChatController) return;

        const color = ia.id === "SuperBrain"
            ? "#00baff"
            : "#7cffa3";

        const avatar = ia.id === "SuperBrain"
            ? "🤖"
            : "🧬";

        ChatController.addCustomMessage({
            text: texto,
            color: color,
            icon: avatar,
            sender: ia.id
        });
    }
};

window.ChatIAReproductionBridge = ChatIAReproductionBridge;
ChatIAReproductionBridge.init();