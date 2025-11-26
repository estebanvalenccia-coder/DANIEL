/* ============================================================
   DEV API CENTER — Centro maestro de APIs internas y externas
//    ============================================================ */

const DevAPICenter = {

    init(){
        this.createPanel();
        this.bind();
    },

    /* ============================================================
       CREAR PANEL
//        ============================================================ */
    createPanel(){
        const box = document.createElement("div");
        box.id = "dev-api-center";

        box.innerHTML = `
            <div class="api-header">
                <span>🌐 API CENTER</span>
                <button id="api-close">✖</button>
            </div>

            <!-- PROBAR API INTERNA -->
            <div class="api-section">
                <h4>API Interna</h4>
                <textarea id="api-internal-payload" placeholder='{"test":true}'></textarea>
                <button id="api-test-internal">Enviar</button>
                <pre id="api-internal-out"></pre>
            </div>

            <!-- PROBAR API EXTERNA -->
            <div class="api-section">
                <h4>API Externa</h4>
                <input id="api-external-url" placeholder="URL completa" />
                <textarea id="api-external-body" placeholder='{"msg":"hola"}'></textarea>
                <button id="api-test-external">Enviar</button>
                <pre id="api-external-out"></pre>
            </div>

            <!-- ANALIZAR ESTADO -->
            <div class="api-section">
                <h4>Estado de APIs</h4>
                <button id="api-status">Analizar</button>
                <pre id="api-status-out"></pre>
            </div>
        `;

        document.body.appendChild(box);
    },

    /* ============================================================
       EVENTOS
//        ============================================================ */
    bind(){
        // Cerrar panel
        document.getElementById("api-close").onclick = ()=> this.hide();

        // API INTERNA
        document.getElementById("api-test-internal").onclick = ()=>{
            const payloadText = document.getElementById("api-internal-payload").value;
            let payload = {};

            try{
                payload = JSON.parse(payloadText);
            }catch(e){
                DevHUD.err("JSON inválido");
                return;
            }

            const res = DevSystemBindings.callAPI("internal", payload);
            document.getElementById("api-internal-out").innerText =
                JSON.stringify(res, null, 2);

            DevHUD.ok("API interna ejecutada");
        };

        // API EXTERNA
        document.getElementById("api-test-external").onclick = async ()=>{
            const url = document.getElementById("api-external-url").value;
            const bodyText = document.getElementById("api-external-body").value;

            if(!url){
                DevHUD.warn("Ingresa una URL");
                return;
            }

            let body = {};
            try{
                body = JSON.parse(bodyText);
            }catch(e){
                DevHUD.err("JSON inválido");
                return;
            }

            try{
                const response = await fetch(url,{
                    method:"POST",
                    headers:{ "Content-Type":"application/json" },
                    body: JSON.stringify(body)
                });
                const data = await response.json();

                document.getElementById("api-external-out").innerText =
                    JSON.stringify(data,null,2);

                DevHUD.ok("API externa ejecutada");
            }catch(e){
                document.getElementById("api-external-out").innerText = "ERROR:\n" + e;
                DevHUD.err("Error externo");
            }
        };

        // ESTADO API
        document.getElementById("api-status").onclick = ()=>{
            const report = {
                internal: !!DevSystemBindings.api.internal,
                external: !!DevSystemBindings.api.external,
                bridge:   !!DevSystemBindings.api.bridge,
                requests: !!DevSystemBindings.api.requests,
                timestamp: Date.now()
            };

            document.getElementById("api-status-out").innerText =
                JSON.stringify(report,null,2);

            DevHUD.info("Estado API actualizado");
        };
    },

    /* ============================================================
       CONTROL VISIBILIDAD
//        ============================================================ */
    show(){
        document.getElementById("dev-api-center").style.display = "flex";
    },

    hide(){
        document.getElementById("dev-api-center").style.display = "none";
    }
};

window.DevAPICenter = DevAPICenter;

document.addEventListener("DOMContentLoaded",()=> DevAPICenter.init());